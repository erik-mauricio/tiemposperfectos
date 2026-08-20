"""
end-to-end adaptive loop test.

Validates pipeline wiring (error detection -> mastery update ->
recommendation change) driven entirely through HTTP calls, not
classifier accuracy or recommender quality
 The Gemini call is monkeypatched for determinism; the
rest of the loop runs for real against the test database.
"""

import uuid

from bkt import DEFAULT_BKT_PARAMETERS
from models import Concept, Exercise, ExerciseConcept, LearnerConceptState


def _fake_classify_errors(exercise_type, prompt, expected_concepts, response, provider=None):
    return {
        "errors": [
            {
                "label": "verb_tense",
                "concept": "qa_loop_concept",
                "text_span": response,
                "suggested_correction": None,
                "confidence": 0.9,
            }
        ],
        "model_version": "fake-gemini-v1",
    }


def test_adaptive_loop_end_to_end(client, db_session, monkeypatch):
    monkeypatch.setattr("learning_events.classify_errors", _fake_classify_errors)

    concept = Concept(
        slug="qa_loop_concept", name="QA Loop Concept", category="grammar", difficulty=1, extra_metadata={}
    )
    db_session.add(concept)
    db_session.flush()

    exercise_low = Exercise(
        type="sentence_correction",
        prompt={"sentence": "She go to school."},
        difficulty=1.5,
        accepted_answers=["She goes to school."],
    )
    exercise_high = Exercise(
        type="fill_blank",
        prompt={"sentence": "She ____ (go) to school."},
        difficulty=3.5,
        accepted_answers=["goes"],
    )
    db_session.add_all([exercise_low, exercise_high])
    db_session.flush()
    db_session.add_all(
        [
            ExerciseConcept(exercise_id=exercise_low.id, concept_id=concept.id),
            ExerciseConcept(exercise_id=exercise_high.id, concept_id=concept.id),
        ]
    )
    db_session.flush()

    user_id = str(uuid.uuid4())

    # 1. Wrong answer on the low-difficulty exercise.
    wrong_resp = client.post(
        "/learning-events",
        json={
            "user_id": user_id,
            "exercise_id": str(exercise_low.id),
            "response": {"text": "She go to school yesterday."},
        },
    )
    assert wrong_resp.status_code == 200, wrong_resp.text
    wrong_body = wrong_resp.json()
    assert wrong_body["correct"] is False

    # 2. A detected error mapped to the concept (from the monkeypatched classifier).
    assert any(e["concept"] == "qa_loop_concept" for e in wrong_body["errors"])

    # 3. Mastery decreased from the default prior.
    state = (
        db_session.query(LearnerConceptState)
        .filter(LearnerConceptState.user_id == user_id, LearnerConceptState.concept_id == concept.id)
        .first()
    )
    assert state is not None
    assert state.mastery_probability < DEFAULT_BKT_PARAMETERS["p_initial"]
    mastery_after_wrong = state.mastery_probability

    # 4. Recommendations reflect the weak concept.
    from recommendations import generate_recommendations

    recs_after_wrong = generate_recommendations(db_session, user_id, limit=100)
    concept_recs_after_wrong = [r for r in recs_after_wrong if r["concept_slug"] == "qa_loop_concept"]
    assert len(concept_recs_after_wrong) > 0
    score_after_wrong = concept_recs_after_wrong[0]["score"]

    # 5. Correct answer on the second (higher-difficulty) exercise, same concept.
    correct_resp = client.post(
        "/learning-events",
        json={
            "user_id": user_id,
            "exercise_id": str(exercise_high.id),
            "response": {"text": "goes"},
        },
    )
    assert correct_resp.status_code == 200, correct_resp.text
    assert correct_resp.json()["correct"] is True

    # 6. Mastery increased from the step-3 value.
    db_session.refresh(state)
    assert state.mastery_probability > mastery_after_wrong

    # 7. Recommendations shift: the concept's score decreases as mastery
    # improves (mastery_need shrinks; recency_need stays low both times
    # since both measurements are taken immediately post-practice.
    recs_after_correct = generate_recommendations(db_session, user_id, limit=100)
    concept_recs_after_correct = [
        r for r in recs_after_correct if r["concept_slug"] == "qa_loop_concept"
    ]
    if concept_recs_after_correct:
        assert concept_recs_after_correct[0]["score"] < score_after_wrong
    # else: mastery crossed MASTERY_THRESHOLD and the concept dropped out
    # of the candidate pool entirely -- also a valid "shifted" outcome.
