import uuid
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from models import Attempt, Concept, Exercise, ExerciseConcept, LearningEvent
from schemas import AttemptIn, AttemptOut, ConceptOut, ExerciseOut

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
    query = db.query(Concept)
    if category:
        query = query.filter(Concept.category == category)
    return query.order_by(Concept.difficulty).all()


@app.get("/exercises", response_model=list[ExerciseOut])
def get_exercises(
    concept: Optional[str] = None,
    db: Session = Depends(get_db),
):
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
    exercise = (
        db.query(Exercise)
        .filter(Exercise.id == exercise_id, Exercise.status == "published")
        .first()
    )
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise


def _normalize(text: str) -> str:
    return text.strip().lower()


@app.post("/attempts", response_model=AttemptOut)
def submit_attempt(attempt_in: AttemptIn, db: Session = Depends(get_db)):
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

    db.commit()
    db.refresh(attempt)

    return AttemptOut(
        id=attempt.id,
        exercise_id=attempt.exercise_id,
        correct=attempt.correct,
        score=attempt.score,
        explanation=exercise.explanation,
    )


@app.get("/mastery/{concept_slug}")
def get_mastery(concept_slug: str, user_id: uuid.UUID, db: Session = Depends(get_db)):
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
