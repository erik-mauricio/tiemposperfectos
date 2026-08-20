import random

from .simulate import (
    P_GUESS_RANGE,
    P_INITIAL_RANGE,
    P_LEARN_RANGE,
    P_SLIP_RANGE,
    generate_synthetic_learners,
    simulate_learner,
)


def test_reproducible_with_same_seed():
    """The same seed produces identical learners and observation sequences."""
    first = generate_synthetic_learners(5, 20, seed=42)
    second = generate_synthetic_learners(5, 20, seed=42)
    assert first == second


def test_different_seeds_produce_different_output():
    """Different seeds produce different synthetic data (sanity check the seed is actually used)."""
    first = generate_synthetic_learners(5, 20, seed=1)
    second = generate_synthetic_learners(5, 20, seed=2)
    assert first != second


def test_always_mastered_never_slips_is_always_correct():
    """A learner who starts mastered and never slips is correct on every attempt."""
    rng = random.Random(0)
    observations = simulate_learner(rng, n_attempts=50, p_initial=1.0, p_learn=0.0, p_guess=0.0, p_slip=0.0)
    assert all(observations)


def test_never_mastered_never_guesses_is_always_incorrect():
    """A learner who never starts mastered, never learns, and never guesses right is always incorrect."""
    rng = random.Random(0)
    observations = simulate_learner(rng, n_attempts=50, p_initial=0.0, p_learn=0.0, p_guess=0.0, p_slip=0.0)
    assert not any(observations)


def test_shape_matches_requested_counts():
    """generate_synthetic_learners returns exactly n_learners entries, each with n_attempts_per_learner observations."""
    learners = generate_synthetic_learners(7, 15, seed=99)
    assert len(learners) == 7
    for learner in learners:
        assert len(learner["observations"]) == 15


def test_params_within_documented_ranges():
    """Every sampled ground-truth parameter falls within its documented range."""
    learners = generate_synthetic_learners(50, 10, seed=7)
    for learner in learners:
        assert P_INITIAL_RANGE[0] <= learner["p_initial"] <= P_INITIAL_RANGE[1]
        assert P_LEARN_RANGE[0] <= learner["p_learn"] <= P_LEARN_RANGE[1]
        assert P_GUESS_RANGE[0] <= learner["p_guess"] <= P_GUESS_RANGE[1]
        assert P_SLIP_RANGE[0] <= learner["p_slip"] <= P_SLIP_RANGE[1]


def test_learner_ids_are_unique_and_sequential():
    """learner_id values are unique and cover range(n_learners)."""
    learners = generate_synthetic_learners(10, 5, seed=3)
    ids = [learner["learner_id"] for learner in learners]
    assert ids == list(range(10))
