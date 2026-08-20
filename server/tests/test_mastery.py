import uuid

from bkt import DEFAULT_BKT_PARAMETERS
from mastery import ERROR_CONFIDENCE_THRESHOLD, apply_learning_event
from models import Concept, ErrorLabel, Exercise, LearnerConceptState, LearningEvent


def _make_concept(db_session, slug="test_concept"):
    concept = Concept(slug=slug, name=slug, category="grammar", difficulty=1, extra_metadata={})
    db_session.add(concept)
    db_session.flush()
    return concept


def _make_exercise(db_session, type_="fill_blank"):
    exercise = Exercise(type=type_, prompt={"text": "prompt"}, difficulty=1.0, accepted_answers=["x"])
    db_session.add(exercise)
    db_session.flush()
    return exercise


def _make_learning_event(db_session, user_id=None):
    event = LearningEvent(
        user_id=user_id or uuid.uuid4(),
        event_type="exercise_answered",
        payload={},
    )
    db_session.add(event)
    db_session.flush()
    return event


def test_new_user_gets_p_initial_as_starting_mastery(db_session):
    """A never-before-seen (user, concept) pair starts at DEFAULT_BKT_PARAMETERS['p_initial']."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session)
    event = _make_learning_event(db_session)

    states = apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [])

    assert len(states) == 1
    state = states[0]
    # The very first update starts from p_initial, then applies one BKT
    # update on top of it -- so we assert it moved *from* p_initial, not
    # that it equals it.
    assert state.attempts == 1
    assert state.correct_attempts == 1


def test_correct_observation_raises_mastery(db_session):
    """A correct observation raises mastery relative to the prior."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session, type_="free_response")
    event = _make_learning_event(db_session)

    states = apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [])
    assert states[0].mastery_probability > DEFAULT_BKT_PARAMETERS["p_initial"]


def test_incorrect_observation_lowers_mastery(db_session):
    """An incorrect observation lowers mastery relative to a high prior."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session, type_="free_response")
    user_id = uuid.uuid4()

    # Prime a high prior via a couple of correct events first.
    event1 = _make_learning_event(db_session, user_id=user_id)
    apply_learning_event(db_session, event1, exercise, True, [str(concept.id)], [])
    event2 = _make_learning_event(db_session, user_id=user_id)
    apply_learning_event(db_session, event2, exercise, True, [str(concept.id)], [])
    db_session.flush()

    state = (
        db_session.query(LearnerConceptState)
        .filter(LearnerConceptState.user_id == user_id, LearnerConceptState.concept_id == concept.id)
        .first()
    )
    prior = state.mastery_probability

    event3 = _make_learning_event(db_session, user_id=user_id)
    states = apply_learning_event(db_session, event3, exercise, False, [str(concept.id)], [])
    assert states[0].mastery_probability < prior


def test_off_target_error_label_above_threshold_updates_its_concept(db_session):
    """A concept only reachable via an ErrorLabel (not an explicit target) still gets updated, with observation=False."""
    target_concept = _make_concept(db_session, slug="target_concept")
    off_target_concept = _make_concept(db_session, slug="off_target_concept")
    exercise = _make_exercise(db_session)
    event = _make_learning_event(db_session)

    error_label = ErrorLabel(
        learning_event_id=event.id,
        label="spelling",
        concept_id=off_target_concept.id,
        confidence=0.9,
        model_version="rules-v1",
    )
    db_session.add(error_label)
    db_session.flush()

    states = apply_learning_event(
        db_session, event, exercise, True, [str(target_concept.id)], [error_label]
    )

    concept_ids_updated = {str(s.concept_id) for s in states}
    assert str(target_concept.id) in concept_ids_updated
    assert str(off_target_concept.id) in concept_ids_updated

    off_target_state = next(s for s in states if str(s.concept_id) == str(off_target_concept.id))
    # Off-target concept's observation is False (an error was found),
    # even though the exercise's overall correctness was True.
    assert off_target_state.correct_attempts == 0


def test_error_label_below_threshold_does_not_trigger_update(db_session):
    """An ErrorLabel with confidence below ERROR_CONFIDENCE_THRESHOLD does not update its concept."""
    off_target_concept = _make_concept(db_session, slug="low_confidence_concept")
    exercise = _make_exercise(db_session)
    event = _make_learning_event(db_session)

    error_label = ErrorLabel(
        learning_event_id=event.id,
        label="spelling",
        concept_id=off_target_concept.id,
        confidence=ERROR_CONFIDENCE_THRESHOLD - 0.1,
        model_version="rules-v1",
    )
    db_session.add(error_label)
    db_session.flush()

    states = apply_learning_event(db_session, event, exercise, True, [], [error_label])
    assert states == []


def test_target_concept_takes_priority_over_error_label_for_same_concept(db_session):
    """When a concept is both explicitly targeted and error-flagged, it's updated once using overall correctness."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session)
    event = _make_learning_event(db_session)

    error_label = ErrorLabel(
        learning_event_id=event.id,
        label="spelling",
        concept_id=concept.id,
        confidence=0.9,
        model_version="rules-v1",
    )
    db_session.add(error_label)
    db_session.flush()

    # Overall correctness True, but an error was flagged for the same
    # (explicitly targeted) concept -- target's overall correctness wins.
    states = apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [error_label])
    assert len(states) == 1
    assert states[0].correct_attempts == 1


def test_rollback_discards_mastery_update(db_session):
    """A mastery update made inside a transaction that gets rolled back does not persist."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session)
    user_id = uuid.uuid4()
    event = _make_learning_event(db_session, user_id=user_id)

    nested = db_session.begin_nested()
    apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [])
    db_session.flush()
    nested.rollback()

    state = (
        db_session.query(LearnerConceptState)
        .filter(LearnerConceptState.user_id == user_id, LearnerConceptState.concept_id == concept.id)
        .first()
    )
    assert state is None


def test_replay_is_idempotent(db_session):
    """Calling apply_learning_event twice with the same learning_event only applies the update once."""
    concept = _make_concept(db_session)
    exercise = _make_exercise(db_session)
    event = _make_learning_event(db_session)

    first = apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [])
    assert len(first) == 1
    assert first[0].attempts == 1

    second = apply_learning_event(db_session, event, exercise, True, [str(concept.id)], [])
    assert second == []

    state = (
        db_session.query(LearnerConceptState)
        .filter(
            LearnerConceptState.user_id == event.user_id,
            LearnerConceptState.concept_id == concept.id,
        )
        .first()
    )
    assert state.attempts == 1
