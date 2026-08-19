"""
Shared write path for recording a learner's response to an exercise as
one immutable LearningEvent used by both POST
/learning-events and (internally) POST /attempts, so there's a single
place that: looks up the exercise server-side, evaluates correctness,
runs error detection (rules + LLM) for free-text types, and persists
the event + any resulting ErrorLabel rows.
"""

from dataclasses import dataclass, field
from typing import Optional
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from correctness import evaluate_correctness
from llm_error_classifier import classify_errors
from mistake_detection import detect_errors
from models import Concept, ErrorLabel, Exercise, ExerciseConcept, LearningEvent

FREE_TEXT_EXERCISE_TYPES = {"sentence_correction", "free_response"}


@dataclass
class DetectedErrorResult:
    label: str
    concept: Optional[str]
    text_span: object
    suggested_correction: Optional[str]
    confidence: Optional[float]
    model_version: str


@dataclass
class LearningEventResult:
    learning_event: LearningEvent
    exercise: Exercise
    is_correct: bool
    score: float
    evaluation_method: str
    detected_errors: list[DetectedErrorResult] = field(default_factory=list)


def record_learning_event(
    db: Session,
    *,
    user_id: UUID,
    exercise_id: UUID,
    response: dict,
    response_time_ms: Optional[int] = None,
    hint_used: bool = False,
    source: str = "exercise",
) -> LearningEventResult:
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    submitted_text = response.get("text", "")
    correctness = evaluate_correctness(exercise, submitted_text)

    target_concepts = (
        db.query(Concept)
        .join(ExerciseConcept, ExerciseConcept.concept_id == Concept.id)
        .filter(ExerciseConcept.exercise_id == exercise_id)
        .all()
    )
    target_concept_ids = [str(concept.id) for concept in target_concepts]
    target_concept_slugs = [concept.slug for concept in target_concepts]

    raw_errors = []
    if exercise.type in FREE_TEXT_EXERCISE_TYPES:
        detection_result = detect_errors(submitted_text)
        raw_errors.extend(
            (error, detection_result["model_version"]) for error in detection_result["errors"]
        )

        classification_result = classify_errors(
            exercise.type, exercise.prompt, target_concept_slugs, submitted_text
        )
        raw_errors.extend(
            (error, classification_result["model_version"])
            for error in classification_result["errors"]
        )

    error_concept_slugs = {error["concept"] for error, _ in raw_errors if error["concept"]}
    error_concepts_by_slug = (
        {
            concept.slug: concept
            for concept in db.query(Concept).filter(Concept.slug.in_(error_concept_slugs)).all()
        }
        if error_concept_slugs
        else {}
    )

    learning_event = LearningEvent(
        user_id=user_id,
        event_type="exercise_answered",
        payload={
            "exercise_id": str(exercise_id),
            "response": response,
            "is_correct": correctness["isCorrect"],
            "score": correctness["score"],
            "evaluation_method": correctness["evaluationMethod"],
            "concept_ids": target_concept_ids,
            "response_time_ms": response_time_ms,
            "hint_used": hint_used,
            "source": source,
        },
    )
    db.add(learning_event)
    db.flush()

    detected_errors = []
    for error, model_version in raw_errors:
        concept = error_concepts_by_slug.get(error["concept"])
        db.add(
            ErrorLabel(
                learning_event_id=learning_event.id,
                label=error["label"],
                concept_id=concept.id if concept else None,
                confidence=error["confidence"],
                model_version=model_version,
            )
        )
        detected_errors.append(
            DetectedErrorResult(
                label=error["label"],
                concept=error["concept"],
                text_span=error["text_span"],
                suggested_correction=error["suggested_correction"],
                confidence=error["confidence"],
                model_version=model_version,
            )
        )

    return LearningEventResult(
        learning_event=learning_event,
        exercise=exercise,
        is_correct=correctness["isCorrect"],
        score=correctness["score"],
        evaluation_method=correctness["evaluationMethod"],
        detected_errors=detected_errors,
    )
