import uuid
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from mistake_detection import detect_errors
from tfidf_classifier import predict_errors
from models import Attempt, Concept, DetectedError, Exercise, ExerciseConcept, LearningEvent
from schemas import AttemptIn, AttemptOut, ConceptOut, DetectedErrorOut, ExerciseOut

FREE_TEXT_EXERCISE_TYPES = {"sentence_correction", "free_response"}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/concepts", response_model=list[ConceptOut])
def get_concepts(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Returns alls concepts ordered by difficulty(easy -> hard)
 
    If `category` is provided, the result is filtered to only concepts
    whose `category` field matches. Othwerise, all
    concepts are returned regardless of category.
 
    Parameters:
        category: Optional[str] 
            e.g. "Grammar" or "Vocabulary". If None, no filtering is
            applied and concepts from every category are included.
        db: Session — SQLAlchemy session injected via `get_db`; used to
            query the `concepts` table. Callers never pass this manually.
 
    Output:
        list[ConceptOut] — a list of concept objects, e.g.:
        [
            {
                "id": "b3f1...-uuid",
                "slug": "preterite_irregular",
                "name": "Irregular preterite verbs",
                "difficulty": 3
            },
            ...
        ]
        Returns an empty list `[]` if no concepts match (never raises
        an error for zero results).
    """

    query = db.query(Concept)
    if category:
        query = query.filter(Concept.category == category)
    return query.order_by(Concept.difficulty).all()


@app.get("/exercises", response_model=list[ExerciseOut])
def get_exercises(
    concept: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Returns Only exercises with `status == "published"`
    If `concept` is provided, the result is further narrowed to
    exercises linked (via `exercise_concepts`) to the concept whose
    slug matches.
 
    Parameters:
        concept: Optional[str] — a concept slug to filter by, e.g.
            "preterite_irregular". If None, exercises for all concepts
            are returned.
        db: Session — SQLAlchemy session injected via `get_db`.
 
    Output:
        list[ExerciseOut] — a list of exercise objects, e.g.:
        [
            {
                "id": "a1c2...-uuid",
                "type": "fill_blank",
                "prompt": {"text": "Yo ___ al restaurante ayer."},
                "difficulty": 2.5,
                "topic": "travel"
            },
            ...
        ]
        Returns an empty list `[]` if nothing matches; never raises.
    """
    query = db.query(Exercise).filter(Exercise.status == "published")
    if concept:
        query = query.join(
            ExerciseConcept, ExerciseConcept.exercise_id == Exercise.id
        ).join(Concept, Concept.id == ExerciseConcept.concept_id).filter(
            Concept.slug == concept
        )
    return query.all()


@app.get("/exercises/{exercise_id}", response_model=ExerciseOut)
def get_exercise(exercise_id: uuid.UUID, db: Session = Depends(get_db)):
    """
    Return a single published exercise by its ID. 
 
    Raises HTTPException(404) when no exercise with that
    ID exists, or when it exists but is not published (drafts and
    archived exercises are treated).
 
    Parameters:
        exercise_id: uuid.UUID — the exercise's primary key, e.g.
            "a1c2d3e4-5678-90ab-cdef-1234567890ab".
        db: Session — SQLAlchemy session injected via `get_db`.
 
    Output:
        ExerciseOut — a single exercise object, e.g.:
        {
            "id": "a1c2...-uuid",
            "type": "translation",
            "prompt": {"text": "I went to the park."},
            "accepted_answers": ["Fui al parque.", "Yo fui al parque."],
            "difficulty": 2.0
        }
        On failure: HTTP 404 with body {"detail": "Exercise not found"}.
    """
    exercise = (
        db.query(Exercise)
        .filter(Exercise.id == exercise_id, Exercise.status == "published")
        .first()
    )
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise


def _normalize(text: str) -> str:
    """
    Returns a new a whitespace-trimmed, lowercased version of `text`, used to
    compare a learner's submitted answer against accepted answers
    case-insensitively and ignoring leading/trailing spaces. 
 
    Parameters:
        text: str — raw text to normalize, e.g. "  I went to the Park".
 
    Output:
        str — the normalized text, e.g. "i went to the park".
    """
    return text.strip().lower()


@app.post("/attempts", response_model=AttemptOut)
def submit_attempt(attempt_in: AttemptIn, db: Session = Depends(get_db)):
    """
    Records a learner's attempt and grades it by runing mistake detection for free-text exercises.

    Preconditions: `attempt_in.exercise_id` must reference an existing exercise.

    Side effects: inserts one `attempts` row and one `learning_events` row
    (event_type="exercise_answered"). If `exercise.type` is in
    `FREE_TEXT_EXERCISE_TYPES`, also inserts one `detected_errors` row per
    error from `detect_errors()` (concept_id is None if the detected
    concept slug doesn't match a `Concept`). Commits all inserts together.

    Parameters:
        attempt_in: AttemptIn — user_id, exercise_id, response (dict with
            "text"), response_time_ms, hints_used.
        db: Session — injected DB session.

    Returns:
        AttemptOut — id, exercise_id, correct, score, explanation, and
        errors (list of DetectedErrorOut, empty if not free-text or none
        detected). `correct`/`score` come from an exact-match check
        against `accepted_answers`, independent of detected errors.

    Raises:
        HTTPException(404): if no exercise matches `exercise_id`
    """

    exercise = db.query(Exercise).filter(Exercise.id == attempt_in.exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    submitted_text = attempt_in.response.get("text", "")
    accepted = exercise.accepted_answers or []
    correct = _normalize(submitted_text) in {_normalize(a) for a in accepted}
    score = 1.0 if correct else 0.0

    attempt = Attempt(
        user_id=attempt_in.user_id,
        exercise_id=attempt_in.exercise_id,
        response=attempt_in.response,
        correct=correct,
        score=score,
        response_time_ms=attempt_in.response_time_ms,
        hints_used=attempt_in.hints_used,
    )
    db.add(attempt)

    db.add(
        LearningEvent(
            user_id=attempt_in.user_id,
            event_type="exercise_answered",
            payload={
                "exercise_id": str(attempt_in.exercise_id),
                "correct": correct,
                "response_time_ms": attempt_in.response_time_ms,
            },
        )
    )
    db.flush()

    detected = []
    if exercise.type in FREE_TEXT_EXERCISE_TYPES:
        detection_result = detect_errors(submitted_text)
        rule_errors = detection_result["errors"]

        # The TF-IDF classifier (3c eval: macro F1 0.30, 1.0 false-positive
        # rate on clean examples) is not reliable enough to run standalone —
        # it would flag error-free submissions as often as not. The rules
        # stay authoritative; the classifier only runs as a secondary pass
        # on responses the rules already flagged, adding labels the rules
        # missed rather than ever being the sole source of a finding.
        classifier_errors = []
        if rule_errors:
            rule_labels = {e["label"] for e in rule_errors}
            classifier_errors = [
                e for e in predict_errors(submitted_text) if e["label"] not in rule_labels
            ]

        all_errors = [(e, detection_result["model_version"]) for e in rule_errors] + [
            (e, "tfidf-v1") for e in classifier_errors
        ]

        concept_slugs = {e["concept"] for e, _ in all_errors if e["concept"]}
        concepts_by_slug = {
            c.slug: c
            for c in db.query(Concept).filter(Concept.slug.in_(concept_slugs)).all()
        } if concept_slugs else {}

        for error, model_version in all_errors:
            concept = concepts_by_slug.get(error["concept"])
            db.add(
                DetectedError(
                    attempt_id=attempt.id,
                    concept_id=concept.id if concept else None,
                    error_type=error["label"],
                    confidence=error["confidence"],
                    text_span=error["text_span"],
                    correction=error["suggested_correction"],
                    model_version=model_version,
                )
            )
            detected.append(DetectedErrorOut(**error))

    db.commit()
    db.refresh(attempt)

    return AttemptOut(
        id=attempt.id,
        exercise_id=attempt.exercise_id,
        correct=attempt.correct,
        score=attempt.score,
        explanation=exercise.explanation,
        errors=detected,
    )


@app.get("/mastery/{concept_slug}")
def get_mastery(concept_slug: str, user_id: uuid.UUID, db: Session = Depends(get_db)):
    """
    Returns a learner's rule-based mastery estimate for one concept, as
    the ratio of correct attempts to total attempts on exercises linked
    to that concept. 
 
    This is the "mastery baseline" formula (weighted_correct / weighted_total,
    unweighted here). This is a placeholder ahead of the real knowledge-tracing
    model. If the learner has no attempts on this concept yet, mastery
    is reported as 0.0.
 
    Raises HTTPException(404) if `concept_slug` does not match any concept in the `concepts` table.
 
    Parameters:
        concept_slug: str — the concept's slug, e.g. "preterite_irregular".
        user_id: uuid.UUID — the learner's ID, e.g.
            "9f8e...-uuid". Passed as a query parameter.
        db: Session — SQLAlchemy session injected via `get_db`.
 
    Output:
        dict — mastery summary, e.g.:
        {
            "concept": "future",
            "attempt_count": 12,
            "correct_count": 7,
            "mastery": 0.5833333333333334
        }
        On failure: HTTP 404 with body {"detail": "Concept not found"}.
    """
    concept = db.query(Concept).filter(Concept.slug == concept_slug).first()
    if not concept:
        raise HTTPException(status_code=404, detail="Concept not found")

    counts = (
        db.query(
            func.count(Attempt.id),
            func.count().filter(Attempt.correct.is_(True)),
        )
        .join(ExerciseConcept, ExerciseConcept.exercise_id == Attempt.exercise_id)
        .filter(
            ExerciseConcept.concept_id == concept.id,
            Attempt.user_id == user_id,
        )
        .first()
    )
    total_count, correct_count = counts
    mastery = (correct_count / total_count) if total_count else 0.0

    return {
        "concept": concept.slug,
        "attempt_count": total_count,
        "correct_count": correct_count,
        "mastery": mastery,
    }
