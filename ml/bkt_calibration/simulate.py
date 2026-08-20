"""
generates synthetic learner sequences with known ground-truth
BKT parameters, so parameter fitting has something with a
known right answer to validate against.

This is the *generative* BKT model -- a hidden mastered/unmastered
state that produces observations and transitions over time -- which is
a different thing from server/bkt.py's update_mastery, an *inference*
function that estimates a posterior probability from a prior and one
observation. simulate_learner does not call update_mastery.

evidence_weight (per-exercise-type observation strength, used at
inference time in server/bkt.py) has no equivalent here -- simulated
observations are full-strength (equivalent to evidence_weight=1.0).
"""

import json
import random
from pathlib import Path

# Documented, literature-plausible ranges -- not fit from data, same
# "starter values" spirit as server/bkt.py's DEFAULT_BKT_PARAMETERS.
P_INITIAL_RANGE = (0.05, 0.6)
P_LEARN_RANGE = (0.05, 0.5)
P_GUESS_RANGE = (0.05, 0.4)
P_SLIP_RANGE = (0.02, 0.3)

OUTPUT_PATH = Path(__file__).parent / "simulated_learners.jsonl"


def simulate_learner(
    rng: random.Random,
    n_attempts: int,
    p_initial: float,
    p_learn: float,
    p_guess: float,
    p_slip: float,
) -> list[bool]:
    """
    Simulates one learner's sequence of observed correct/incorrect
    attempts from the standard BKT generative process: a hidden
    mastered/unmastered state produces each observation, then
    (if not yet mastered) transitions to mastered with probability
    p_learn.

    Returns:
        list[bool] — True for correct, one per attempt, length n_attempts.
    """
    mastered = rng.random() < p_initial
    observations = []
    for _ in range(n_attempts):
        if mastered:
            correct = rng.random() < (1 - p_slip)
        else:
            correct = rng.random() < p_guess
        observations.append(correct)

        if not mastered:
            mastered = rng.random() < p_learn
    return observations


def generate_synthetic_learners(n_learners: int, n_attempts_per_learner: int, seed: int) -> list[dict]:
    """
    Returns n_learners synthetic learners, each a dict with its
    ground-truth params and its simulated observation sequence:
    {"learner_id", "p_initial", "p_learn", "p_guess", "p_slip", "observations"}.
    Reproducible: the same seed always produces the same output.
    """
    rng = random.Random(seed)
    learners = []
    for learner_id in range(n_learners):
        p_initial = rng.uniform(*P_INITIAL_RANGE)
        p_learn = rng.uniform(*P_LEARN_RANGE)
        p_guess = rng.uniform(*P_GUESS_RANGE)
        p_slip = rng.uniform(*P_SLIP_RANGE)
        observations = simulate_learner(rng, n_attempts_per_learner, p_initial, p_learn, p_guess, p_slip)
        learners.append(
            {
                "learner_id": learner_id,
                "p_initial": p_initial,
                "p_learn": p_learn,
                "p_guess": p_guess,
                "p_slip": p_slip,
                "observations": observations,
            }
        )
    return learners


if __name__ == "__main__":
    learners = generate_synthetic_learners(n_learners=200, n_attempts_per_learner=30, seed=42)
    with open(OUTPUT_PATH, "w") as f:
        for learner in learners:
            f.write(json.dumps(learner) + "\n")
    print(f"Wrote {len(learners)} synthetic learners to {OUTPUT_PATH}")
