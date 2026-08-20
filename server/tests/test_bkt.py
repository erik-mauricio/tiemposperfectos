import random

from bkt import (
    DEFAULT_BKT_PARAMETERS,
    DEFAULT_EVIDENCE_WEIGHT,
    EVIDENCE_WEIGHTS,
    evidence_weight_for_exercise_type,
    update_mastery,
)


def test_correct_answer_raises_posterior():
    """A correct observation raises mastery relative to the prior, all else equal."""
    prior = 0.3
    posterior = update_mastery(prior, True, p_learn=0.2, p_guess=0.2, p_slip=0.1)
    assert posterior > prior


def test_incorrect_answer_lowers_posterior_before_learning_floor():
    """An incorrect observation lowers the raw posterior before the learning-transition floor is applied."""
    prior = 0.6
    # Compute the pre-transition posterior by hand to isolate the "lowers"
    # claim from the learning-transition floor, which always nudges the
    # final result upward regardless of correctness.
    p_slip, p_guess, p_learn = 0.1, 0.2, 0.2
    p_correct_given_mastered = p_slip
    p_correct_given_unmastered = 1 - p_guess
    numerator = prior * p_correct_given_mastered
    denominator = numerator + (1 - prior) * p_correct_given_unmastered
    raw_posterior = numerator / denominator
    assert raw_posterior < prior

    final = update_mastery(prior, False, p_learn=p_learn, p_guess=p_guess, p_slip=p_slip)
    assert final == raw_posterior + (1 - raw_posterior) * p_learn


def test_output_always_in_unit_interval():
    """update_mastery's output stays within [0, 1] across randomized valid inputs."""
    rng = random.Random(42)
    for _ in range(500):
        prior = rng.uniform(0.0, 1.0)
        correct = rng.choice([True, False])
        p_learn = rng.uniform(0.0, 1.0)
        p_guess = rng.uniform(0.0, 1.0)
        p_slip = rng.uniform(0.0, 1.0)
        evidence_weight = rng.uniform(0.0, 1.0)
        result = update_mastery(prior, correct, p_learn, p_guess, p_slip, evidence_weight)
        assert 0.0 <= result <= 1.0


def test_zero_evidence_weight_leaves_prior_unchanged_by_learning_transition():
    """An evidence_weight of 0.0 ignores the observation entirely, applying only the learning transition to the prior."""
    prior = 0.4
    p_learn = 0.2
    result = update_mastery(prior, True, p_learn=p_learn, p_guess=0.2, p_slip=0.1, evidence_weight=0.0)
    expected = prior + (1 - prior) * p_learn
    assert abs(result - expected) < 1e-9


def test_hand_computed_correct_case():
    """A hand-computed known-value case for a correct, full-strength observation."""
    # prior=0.5, p_slip=0.1, p_guess=0.2, p_learn=0.2, evidence_weight=1.0
    # p_correct_given_mastered = 0.9, p_correct_given_unmastered = 0.2
    # numerator = 0.5*0.9 = 0.45, denominator = 0.45 + 0.5*0.2 = 0.55
    # posterior = 0.45/0.55 = 0.818181...
    # final = 0.818181... + (1 - 0.818181...) * 0.2 = 0.854545...
    result = update_mastery(0.5, True, p_learn=0.2, p_guess=0.2, p_slip=0.1, evidence_weight=1.0)
    assert abs(result - 0.8545454545) < 1e-6


def test_hand_computed_incorrect_case():
    """A hand-computed known-value case for an incorrect, full-strength observation."""
    # prior=0.5, p_slip=0.1, p_guess=0.2, p_learn=0.2, evidence_weight=1.0
    # p_correct_given_mastered (for incorrect branch) = p_slip = 0.1
    # p_correct_given_unmastered (for incorrect branch) = 1 - p_guess = 0.8
    # numerator = 0.5*0.1 = 0.05, denominator = 0.05 + 0.5*0.8 = 0.45
    # posterior = 0.05/0.45 = 0.111111...
    # final = 0.111111... + (1 - 0.111111...) * 0.2 = 0.288888...
    result = update_mastery(0.5, False, p_learn=0.2, p_guess=0.2, p_slip=0.1, evidence_weight=1.0)
    assert abs(result - 0.2888888889) < 1e-6


def test_hand_computed_blended_evidence_weight_case():
    """A hand-computed known-value case for a partial-strength (blended) observation."""
    # Using the correct-case posterior from above (0.818181...), blended
    # 60% toward it from the prior 0.5: 0.6*0.818181... + 0.4*0.5 = 0.690909...
    # final = 0.690909... + (1 - 0.690909...) * 0.2 = 0.752727...
    result = update_mastery(0.5, True, p_learn=0.2, p_guess=0.2, p_slip=0.1, evidence_weight=0.6)
    assert abs(result - 0.7527272727) < 1e-6


def test_default_bkt_parameters_shape():
    """DEFAULT_BKT_PARAMETERS has exactly the four expected keys."""
    assert set(DEFAULT_BKT_PARAMETERS.keys()) == {"p_initial", "p_learn", "p_guess", "p_slip"}


def test_evidence_weight_for_known_exercise_types():
    """Each known exercise type resolves to its configured evidence weight."""
    for exercise_type, weight in EVIDENCE_WEIGHTS.items():
        assert evidence_weight_for_exercise_type(exercise_type) == weight


def test_evidence_weight_for_unknown_exercise_type_falls_back_to_default():
    """An exercise type not in EVIDENCE_WEIGHTS (e.g. reading_comprehension, spelling) uses the default weight."""
    assert evidence_weight_for_exercise_type("reading_comprehension") == DEFAULT_EVIDENCE_WEIGHT
    assert evidence_weight_for_exercise_type("spelling") == DEFAULT_EVIDENCE_WEIGHT
    assert evidence_weight_for_exercise_type("totally_unknown_type") == DEFAULT_EVIDENCE_WEIGHT
