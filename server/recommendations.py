"""
Rule-based exercise recommendation
"""

from datetime import datetime, timedelta, timezone
from uuid import UUID

from sqlalchemy.orm import Session

from bkt import DEFAULT_BKT_PARAMETERS
from models import Concept, ErrorLabel, Exercise, ExerciseConcept, LearnerConceptState, LearningEvent

MODEL_VERSION = "rule-based-v1"

MASTERY_THRESHOLD = 0.80
RECENT_ATTEMPT_EXCLUSION_DAYS = 7
RECENT_ERROR_LIMIT = 10
RECENT_ERROR_CONFIDENCE_THRESHOLD = 0.5
RECENCY_URGENCY_CAP_DAYS = 30

# Documented mastery -> target-difficulty-band heuristic. Exercise.difficulty is an author-assigned
# float; this project's seed data spans roughly 1.0-3.0 today, but the
# scale is defined up to 5.0 (matching Concept.difficulty's 1-5 range)
# so future harder exercises have room without rescaling this constant.
DIFFICULTY_SCALE_MIN = 1.0
DIFFICULTY_SCALE_MAX = 5.0

WEIGHTS = {
    "mastery_need": 0.50,
    "recency_need": 0.25,
    "recent_error_need": 0.15,
    "difficulty_fit": 0.10,
}


def _recent_error_concept_ids(db: Session, user_id: UUID) -> set:
    """
    The learner's last RECENT_ERROR_LIMIT ErrorLabel rows above
    RECENT_ERROR_CONFIDENCE_THRESHOLD, as a set of concept ids. Same
    "is this error significant enough to count" threshold mastery.py
    uses for mastery updates, reused here for scoring.
    """
    rows = (
        db.query(ErrorLabel.concept_id)
        .join(LearningEvent, LearningEvent.id == ErrorLabel.learning_event_id)
        .filter(
            LearningEvent.user_id == user_id,
            ErrorLabel.concept_id.isnot(None),
            ErrorLabel.confidence >= RECENT_ERROR_CONFIDENCE_THRESHOLD,
        )
        .order_by(ErrorLabel.created_at.desc())
        .limit(RECENT_ERROR_LIMIT)
        .all()
    )
    return {row[0] for row in rows}


def _recently_attempted_exercise_ids(db: Session, user_id: UUID) -> set:
    """
    Exercise ids the learner has a LearningEvent for within the last
    RECENT_ATTEMPT_EXCLUSION_DAYS days read from payload["exercise_id"]
    client-side (JSONB)
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=RECENT_ATTEMPT_EXCLUSION_DAYS)
    recent_events = (
        db.query(LearningEvent)
        .filter(LearningEvent.user_id == user_id, LearningEvent.occurred_at > cutoff)
        .all()
    )
    excluded = set()
    for event in recent_events:
        exercise_id = event.payload.get("exercise_id")
        if exercise_id:
            excluded.add(UUID(exercise_id))
    return excluded


def _candidate_exercises(db: Session, user_id: UUID, cefr_levels: list[str] | None = None) -> list[Exercise]:
    """
    Published exercises linked to a concept below MASTERY_THRESHOLD (or
    never attempted), excluding
    exercises answered in the last RECENT_ATTEMPT_EXCLUSION_DAYS days.
    """
    excluded_exercise_ids = _recently_attempted_exercise_ids(db, user_id)

    query = (
        db.query(Exercise)
        .join(ExerciseConcept, ExerciseConcept.exercise_id == Exercise.id)
        .outerjoin(
            LearnerConceptState,
            (LearnerConceptState.concept_id == ExerciseConcept.concept_id)
            & (LearnerConceptState.user_id == user_id),
        )
        .filter(Exercise.status == "published")
        .filter(
            (LearnerConceptState.mastery_probability.is_(None))
            | (LearnerConceptState.mastery_probability < MASTERY_THRESHOLD)
        )
    )
    if excluded_exercise_ids:
        query = query.filter(Exercise.id.notin_(excluded_exercise_ids))
    if cefr_levels:
        query = query.filter(Exercise.cefr_level.in_(cefr_levels))
    return query.distinct().all()


def _difficulty_fit(exercise_difficulty: float, mastery: float) -> float:
    """
    1.0 when the exercise's difficulty exactly matches the mastery-implied
    target band; 0.0 at the opposite end of the scale; linear in between.
    """
    scale_range = DIFFICULTY_SCALE_MAX - DIFFICULTY_SCALE_MIN
    target_difficulty = DIFFICULTY_SCALE_MIN + mastery * scale_range
    fit = 1 - abs(exercise_difficulty - target_difficulty) / scale_range
    return max(0.0, min(1.0, fit))


def _score_exercise(
    db: Session, exercise: Exercise, user_id: UUID, recent_error_concept_ids: set
) -> dict:
    """
    Scores `exercise` against its weakest linked concept (the concept
    driving why this exercise was selected) and builds human-readable
    reasons for it.
    """
    linked = (
        db.query(Concept, LearnerConceptState)
        .join(ExerciseConcept, ExerciseConcept.concept_id == Concept.id)
        .outerjoin(
            LearnerConceptState,
            (LearnerConceptState.concept_id == Concept.id) & (LearnerConceptState.user_id == user_id),
        )
        .filter(ExerciseConcept.exercise_id == exercise.id)
        .all()
    )

    best = None
    for concept, state in linked:
        mastery = state.mastery_probability if state else DEFAULT_BKT_PARAMETERS["p_initial"]
        mastery_need = 1 - mastery

        if state and state.last_practiced_at:
            days_since_practiced = (datetime.now(timezone.utc) - state.last_practiced_at).days
            recency_need = min(days_since_practiced / RECENCY_URGENCY_CAP_DAYS, 1.0)
        else:
            days_since_practiced = None
            recency_need = 1.0

        recent_error_need = 1.0 if concept.id in recent_error_concept_ids else 0.0
        difficulty_fit = _difficulty_fit(exercise.difficulty, mastery)

        score = (
            WEIGHTS["mastery_need"] * mastery_need
            + WEIGHTS["recency_need"] * recency_need
            + WEIGHTS["recent_error_need"] * recent_error_need
            + WEIGHTS["difficulty_fit"] * difficulty_fit
        )

        if best is None or score > best["score"]:
            reasons = [f"Your {concept.slug} mastery is {mastery * 100:.0f}%."]
            reasons.append(
                f"Last practiced {days_since_practiced} day(s) ago."
                if days_since_practiced is not None
                else "You haven't practiced this concept yet."
            )
            if recent_error_need:
                reasons.append(f"You made a recent error related to {concept.slug}.")
            best = {
                "exercise": exercise,
                "score": score,
                "reasons": reasons,
                "concept_slug": concept.slug,
            }
    return best


def generate_recommendations(
    db: Session, user_id: UUID, limit: int = 5, cefr_levels: list[str] | None = None
) -> list[dict]:
    """
    Returns up to `limit` recommended exercises for `user_id`, ranked
    best-first, as [{"exercise", "score", "reasons", "concept_slug"}, ...].
    """
    candidates = _candidate_exercises(db, user_id, cefr_levels=cefr_levels)
    if not candidates:
        return []

    recent_error_concept_ids = _recent_error_concept_ids(db, user_id)
    scored = [
        _score_exercise(db, exercise, user_id, recent_error_concept_ids) for exercise in candidates
    ]
    ranked = sorted(scored, key=lambda r: r["score"], reverse=True)
    return ranked[:limit]
