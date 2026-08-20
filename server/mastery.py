"""
applies one learning event's evidence to
LearnerConceptState via BKT (bkt.py).

Which concepts get updated, and with what observation, only updates explicitly 
targeted concepts, or
concepts an error classifier flagged above a confidence threshold. This
is where the design decision (classify_errors validates against
the full taxonomy, not filtered to expected_concepts) actually gets
acted on. off-target ErrorLabel rows exist in the database, but only
move mastery here if they clear the threshold.
"""

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from bkt import DEFAULT_BKT_PARAMETERS, evidence_weight_for_exercise_type, update_mastery
from models import ErrorLabel, Exercise, LearnerConceptState, LearningEvent


ERROR_CONFIDENCE_THRESHOLD = 0.5


def apply_learning_event(
    db: Session,
    learning_event: LearningEvent,
    exercise: Exercise,
    is_correct: bool,
    target_concept_ids: list[str],
    error_labels: list[ErrorLabel],
) -> list[LearnerConceptState]:
    """
    Updates LearnerConceptState for every concept that qualifies for a
    mastery update from this event, and marks the event as processed.

    Idempotent: a second call with an already-processed `learning_event`
    is a no-op, returning [].
    """
    if learning_event.processed_for_mastery:
        return []

    target_ids = set(target_concept_ids)

    # (concept_id -> observation) -- explicitly targeted concepts take
    # priority over an inferred off-target error for the same concept,
    # since overall correctness is a more direct signal than an
    # inferred error.
    observations: dict[str, bool] = {concept_id: is_correct for concept_id in target_ids}

    for error_label in error_labels:
        if error_label.concept_id is None:
            continue
        if (error_label.confidence or 0.0) < ERROR_CONFIDENCE_THRESHOLD:
            continue
        concept_id = str(error_label.concept_id)
        if concept_id in observations:
            continue
        observations[concept_id] = False

    evidence_weight = evidence_weight_for_exercise_type(exercise.type)
    now = datetime.now(timezone.utc)

    updated_states = []
    for concept_id, observation in observations.items():
        state = (
            db.query(LearnerConceptState)
            .filter(
                LearnerConceptState.user_id == learning_event.user_id,
                LearnerConceptState.concept_id == concept_id,
            )
            .first()
        )
        if state is None:
            state = LearnerConceptState(
                user_id=learning_event.user_id,
                concept_id=concept_id,
                mastery_probability=DEFAULT_BKT_PARAMETERS["p_initial"],
                attempts=0,
                correct_attempts=0,
            )
            db.add(state)

        state.mastery_probability = update_mastery(
            state.mastery_probability,
            observation,
            DEFAULT_BKT_PARAMETERS["p_learn"],
            DEFAULT_BKT_PARAMETERS["p_guess"],
            DEFAULT_BKT_PARAMETERS["p_slip"],
            evidence_weight,
        )
        state.attempts += 1
        if observation:
            state.correct_attempts += 1
        state.last_practiced_at = now
        state.updated_at = now

        updated_states.append(state)

    learning_event.processed_for_mastery = True

    return updated_states
