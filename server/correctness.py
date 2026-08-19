"""
Handles grading for exercise types with a known-good answer: multiple_choice, fill_blank, sentence_correction,
spelling, and reading_comprehension/short-answer types all compare the
learner's response against `Exercise.accepted_answers`. Free-text types
that need judgment (free_response) get evaluated via
the same accepted-answers list match, but return a lower-confidence
`evaluationMethod` for callers that want to know whether to also send
the response through the error classifier.
"""

import re
import string


def _normalize_text(text: str) -> str:
    """
    Lowercases, strips leading/trailing whitespace, collapses leading and ending
    whitespace, and drops surrounding punctuation, so "  She works!  "
    and "she works" compare equal.
    """
    text = text.strip().lower()
    text = re.sub(r"\s+", " ", text)
    text = text.strip(string.punctuation + " ")
    return text


def _edit_distance(a: str, b: str) -> int:
    """Levenshtein distance between two strings."""
    if a == b:
        return 0
    if not a:
        return len(b)
    if not b:
        return len(a)

    previous_row = list(range(len(b) + 1))
    for i, char_a in enumerate(a, start=1):
        current_row = [i]
        for j, char_b in enumerate(b, start=1):
            insert_cost = current_row[j - 1] + 1
            delete_cost = previous_row[j] + 1
            substitute_cost = previous_row[j - 1] + (char_a != char_b)
            current_row.append(min(insert_cost, delete_cost, substitute_cost))
        previous_row = current_row
    return previous_row[-1]


SPELLING_EDIT_DISTANCE_TOLERANCE = 1


STRING_MATCH_TYPES = {
    "multiple_choice",
    "fill_blank",
    "sentence_correction",
    "reading_comprehension",
    "free_response",
}


def evaluate_correctness(exercise, response_text: str) -> dict:
    """
    Returns {"isCorrect": bool, "score": float, "evaluationMethod": str}.

    `evaluationMethod` is one of "exact_match", "normalized_match", or
    "edit_distance" 
    """
    accepted_answers = exercise.accepted_answers or []
    response_text = response_text or ""

    if response_text in accepted_answers:
        return {"isCorrect": True, "score": 1.0, "evaluationMethod": "exact_match"}

    normalized_response = _normalize_text(response_text)
    normalized_accepted = {_normalize_text(a) for a in accepted_answers}

    if exercise.type == "spelling":
        if normalized_response in normalized_accepted:
            return {"isCorrect": True, "score": 1.0, "evaluationMethod": "normalized_match"}
        for accepted in normalized_accepted:
            if _edit_distance(normalized_response, accepted) <= SPELLING_EDIT_DISTANCE_TOLERANCE:
                return {"isCorrect": True, "score": 0.75, "evaluationMethod": "edit_distance"}
        return {"isCorrect": False, "score": 0.0, "evaluationMethod": "edit_distance"}


    if normalized_response in normalized_accepted:
        return {"isCorrect": True, "score": 1.0, "evaluationMethod": "normalized_match"}

    return {"isCorrect": False, "score": 0.0, "evaluationMethod": "normalized_match"}
