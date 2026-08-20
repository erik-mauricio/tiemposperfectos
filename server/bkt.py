"""Bayesian Knowledge Tracing — standard posterior/transition update.

Single documented evidence strategy: each exercise type has a fixed
observation-strength weight; a correct/incorrect observation is blended
toward "no observation" (prior left unchanged) in proportion to
(1 - weight) before applying the standard BKT posterior update. A
weight of 1.0 (free_response) behaves like textbook BKT; a weight of
0.60 (multiple_choice) pulls the posterior only 60% of the way from the
prior to what a full-strength observation would produce.
"""

EVIDENCE_WEIGHTS = {
    "multiple_choice": 0.60,
    "fill_blank": 0.75,
    "sentence_correction": 0.90,
    "free_response": 1.00,
}
DEFAULT_EVIDENCE_WEIGHT = 0.75

MODEL_VERSION = "bkt-v1"

# Literature-informed starter values, not fit from data. Refit only
# once enough validated sequence data exists
DEFAULT_BKT_PARAMETERS = {
    "p_initial": 0.3,
    "p_learn": 0.2,
    "p_guess": 0.2,
    "p_slip": 0.1,
}


def update_mastery(
    prior: float,
    correct: bool,
    p_learn: float,
    p_guess: float,
    p_slip: float,
    evidence_weight: float = 1.0,
) -> float:
    """
    Applies one BKT observation update and returns the new mastery
    probability.

    Parameters:
        prior: float — mastery probability before this observation, in
            [0, 1].
        correct: bool — whether the response was correct.
        p_learn: float — P(T), probability of transitioning from unmastered
            to mastered after this attempt.
        p_guess: float — P(G), probability of a correct response while
            unmastered.
        p_slip: float — P(S), probability of an incorrect response while
            mastered.
        evidence_weight: float — observation strength in [0, 1] (see
            module docstring). 1.0 is a full-strength textbook BKT
            update; 0.0 leaves `prior` unchanged.

    Returns:
        float — posterior mastery probability after the learning
        transition, in [0, 1].
    """
    if correct:
        p_correct_given_mastered = 1 - p_slip
        p_correct_given_unmastered = p_guess
    else:
        p_correct_given_mastered = p_slip
        p_correct_given_unmastered = 1 - p_guess

    numerator = prior * p_correct_given_mastered
    denominator = numerator + (1 - prior) * p_correct_given_unmastered
    posterior_given_evidence = numerator / denominator if denominator > 0 else prior

    # Blend the full-strength posterior toward the prior by evidence_weight,
    # then apply the learning transition to whichever mastery estimate results.
    blended_posterior = (
        evidence_weight * posterior_given_evidence + (1 - evidence_weight) * prior
    )
    return blended_posterior + (1 - blended_posterior) * p_learn


def evidence_weight_for_exercise_type(exercise_type: str) -> float:
    """
    Looks up the observation-strength weight for an exercise type.

    Parameters:
        exercise_type: str — e.g. "sentence_correction".

    Returns:
        float — the configured weight, or `DEFAULT_EVIDENCE_WEIGHT` for an
        exercise type not in `EVIDENCE_WEIGHTS`.
    """
    return EVIDENCE_WEIGHTS.get(exercise_type, DEFAULT_EVIDENCE_WEIGHT)
