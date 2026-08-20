import uuid

import pytest

from models import Concept, Exercise, ExerciseConcept, LearnerConceptState, LearningEvent
from recommendations import (
    DIFFICULTY_SCALE_MAX,
    DIFFICULTY_SCALE_MIN,
    MASTERY_THRESHOLD,
    _difficulty_fit,
    generate_recommendations,
)


def _make_concept(db_session, slug, mastery=None):
    concept = Concept(slug=slug, name=slug, category="grammar", difficulty=1, extra_metadata={})
    db_session.add(concept)
    db_session.flush()
    return concept


def _make_exercise(db_session, concept, difficulty=2.0, type_="fill_blank"):
    exercise = Exercise(
        type=type_, prompt={"text": "prompt"}, difficulty=difficulty, accepted_answers=["x"]
    )
    db_session.add(exercise)
    db_session.flush()
    db_session.add(ExerciseConcept(exercise_id=exercise.id, concept_id=concept.id))
    db_session.flush()
    return exercise


def _set_mastery(db_session, user_id, concept, probability):
    state = LearnerConceptState(
        user_id=user_id,
        concept_id=concept.id,
        mastery_probability=probability,
        attempts=1,
        correct_attempts=1,
    )
    db_session.add(state)
    db_session.flush()
    return state




def test_difficulty_fit_exact_match_scores_one():
    """Difficulty exactly matching the mastery-implied target band scores 1.0."""
    mastery = 0.5
    target = DIFFICULTY_SCALE_MIN + mastery * (DIFFICULTY_SCALE_MAX - DIFFICULTY_SCALE_MIN)
    assert _difficulty_fit(target, mastery) == pytest.approx(1.0)


def test_difficulty_fit_max_distance_scores_zero():
    """Difficulty at the opposite end of the scale from the target scores 0.0."""
    assert _difficulty_fit(DIFFICULTY_SCALE_MAX, 0.0) == pytest.approx(0.0)
    assert _difficulty_fit(DIFFICULTY_SCALE_MIN, 1.0) == pytest.approx(0.0)


def test_difficulty_fit_clamped_within_scale_bounds():
    """A difficulty value outside the defined scale is clamped to [0, 1], not negative."""
    assert _difficulty_fit(DIFFICULTY_SCALE_MAX + 10, 0.0) == 0.0



def test_top_n_returns_exactly_n(db_session):
    """Requesting n recommendations with more qualifying candidates returns exactly n."""
    user_id = uuid.uuid4()
    concept = _make_concept(db_session, "many_exercises_concept")
    for i in range(5):
        _make_exercise(db_session, concept, difficulty=1.0 + i * 0.5)

    results = generate_recommendations(db_session, user_id, limit=2)
    assert len(results) == 2


def test_mastered_concepts_not_recommended(db_session):
    """A user with one mastered and one unmastered concept only gets exercises for the unmastered one."""
    user_id = uuid.uuid4()
    mastered_concept = _make_concept(db_session, "mastered_concept")
    weak_concept = _make_concept(db_session, "weak_concept")
    mastered_exercise = _make_exercise(db_session, mastered_concept)
    weak_exercise = _make_exercise(db_session, weak_concept)

    _set_mastery(db_session, user_id, mastered_concept, MASTERY_THRESHOLD + 0.1)
    _set_mastery(db_session, user_id, weak_concept, 0.2)

    results = generate_recommendations(db_session, user_id, limit=100)
    recommended_ids = {r["exercise"].id for r in results}
    assert weak_exercise.id in recommended_ids
    assert mastered_exercise.id not in recommended_ids


def test_no_immediate_repeat_after_recent_attempt(db_session):
    """An exercise the learner just answered is excluded from the next recommendation call."""
    user_id = uuid.uuid4()
    concept = _make_concept(db_session, "repeat_test_concept")
    exercise = _make_exercise(db_session, concept)

    before = generate_recommendations(db_session, user_id, limit=100)
    assert exercise.id in {r["exercise"].id for r in before}

    event = LearningEvent(
        user_id=user_id,
        event_type="exercise_answered",
        payload={"exercise_id": str(exercise.id), "is_correct": True},
    )
    db_session.add(event)
    db_session.flush()

    after = generate_recommendations(db_session, user_id, limit=100)
    assert exercise.id not in {r["exercise"].id for r in after}


def test_reasons_are_populated(db_session):
    """Every returned recommendation has a non-empty reasons list."""
    user_id = uuid.uuid4()
    concept = _make_concept(db_session, "reasons_test_concept")
    _make_exercise(db_session, concept)

    results = generate_recommendations(db_session, user_id, limit=100)
    assert len(results) >= 1
    for result in results:
        assert len(result["reasons"]) > 0


def test_no_candidates_returns_empty_list(db_session):
    """A user with no qualifying candidates (e.g. an impossible cefr_levels filter) gets an empty list, not an error."""
    user_id = uuid.uuid4()
    results = generate_recommendations(
        db_session, user_id, limit=5, cefr_levels=["__no_such_level__"]
    )
    assert results == []
