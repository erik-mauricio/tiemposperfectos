from types import SimpleNamespace

from correctness import evaluate_correctness


def _exercise(type_="fill_blank", accepted_answers=None):
    return SimpleNamespace(type=type_, accepted_answers=accepted_answers or [])


def test_exact_match():
    """A response identical to an accepted answer is graded exact_match."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "went")
    assert result == {"isCorrect": True, "score": 1.0, "evaluationMethod": "exact_match"}


def test_case_insensitive_match():
    """A response differing only in letter case still counts as correct."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "Went")
    assert result["isCorrect"] is True
    assert result["evaluationMethod"] == "normalized_match"


def test_leading_trailing_whitespace():
    """Surrounding whitespace on the response is ignored."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "  went  ")
    assert result["isCorrect"] is True


def test_internal_whitespace_collapsed():
    """Extra spaces between words don't change correctness."""
    result = evaluate_correctness(
        _exercise(accepted_answers=["I went to the store."]),
        "I   went  to the store.",
    )
    assert result["isCorrect"] is True


def test_trailing_period_ignored():
    """A trailing period on the response doesn't cause a mismatch."""
    result = evaluate_correctness(_exercise(accepted_answers=["I ate rice"]), "I ate rice.")
    assert result["isCorrect"] is True


def test_trailing_exclamation_ignored():
    """A trailing exclamation point on the response doesn't cause a mismatch."""
    result = evaluate_correctness(_exercise(accepted_answers=["I ate rice"]), "I ate rice!")
    assert result["isCorrect"] is True


def test_leading_punctuation_ignored():
    """Surrounding quote marks on the response don't cause a mismatch."""
    result = evaluate_correctness(_exercise(accepted_answers=["I ate rice"]), '"I ate rice"')
    assert result["isCorrect"] is True


def test_wrong_answer():
    """A response that doesn't match any accepted answer is graded incorrect."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "goed")
    assert result == {"isCorrect": False, "score": 0.0, "evaluationMethod": "normalized_match"}


def test_empty_response_is_wrong():
    """An empty response string is never correct."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "")
    assert result["isCorrect"] is False


def test_none_response_treated_as_empty():
    """A None response is treated the same as an empty string, not an error."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), None)
    assert result["isCorrect"] is False


def test_multiple_accepted_answers_first_matches():
    """Matching the first entry in a multi-answer accepted list counts as correct."""
    ex = _exercise(accepted_answers=["I saw an elephant.", "An elephant, I saw."])
    result = evaluate_correctness(ex, "I saw an elephant.")
    assert result["isCorrect"] is True


def test_multiple_accepted_answers_second_matches():
    """Matching a later entry in a multi-answer accepted list also counts as correct."""
    ex = _exercise(accepted_answers=["I saw an elephant.", "An elephant, I saw."])
    result = evaluate_correctness(ex, "an elephant, i saw")
    assert result["isCorrect"] is True


def test_multiple_choice_type():
    """A multiple_choice exercise grades a matching choice as correct."""
    ex = _exercise(type_="multiple_choice", accepted_answers=["She works every Saturday."])
    result = evaluate_correctness(ex, "She works every Saturday.")
    assert result["isCorrect"] is True


def test_multiple_choice_wrong_choice():
    """A multiple_choice exercise grades a non-matching choice as incorrect."""
    ex = _exercise(type_="multiple_choice", accepted_answers=["She works every Saturday."])
    result = evaluate_correctness(ex, "She work every Saturday.")
    assert result["isCorrect"] is False


def test_sentence_correction_type():
    """A sentence_correction exercise grades a matching correction as correct."""
    ex = _exercise(type_="sentence_correction", accepted_answers=["I ate rice."])
    result = evaluate_correctness(ex, "i ate rice")
    assert result["isCorrect"] is True


def test_reading_comprehension_type():
    """A reading_comprehension exercise grades a matching answer as correct."""
    ex = _exercise(
        type_="reading_comprehension",
        accepted_answers=["Maria bakes bread every morning before the shop opens."],
    )
    result = evaluate_correctness(
        ex, "Maria bakes bread every morning before the shop opens."
    )
    assert result["isCorrect"] is True


def test_reading_comprehension_wrong_choice():
    """A reading_comprehension exercise grades a non-matching answer as incorrect."""
    ex = _exercise(
        type_="reading_comprehension",
        accepted_answers=["Maria bakes bread every morning before the shop opens."],
    )
    result = evaluate_correctness(ex, "Bread has a pleasant smell.")
    assert result["isCorrect"] is False


def test_free_response_type_correct():
    """A free_response exercise grades a matching answer as correct."""
    ex = _exercise(type_="free_response", accepted_answers=["I like coffee"])
    result = evaluate_correctness(ex, "I like coffee")
    assert result["isCorrect"] is True


def test_free_response_type_incorrect():
    """A free_response exercise grades a non-matching answer as incorrect."""
    ex = _exercise(type_="free_response", accepted_answers=["I like coffee"])
    result = evaluate_correctness(ex, "I like tea")
    assert result["isCorrect"] is False


def test_no_accepted_answers_never_matches():
    """An exercise with no accepted answers can never be graded correct."""
    ex = _exercise(accepted_answers=[])
    result = evaluate_correctness(ex, "anything")
    assert result["isCorrect"] is False


def test_punctuation_only_response_normalizes_to_empty():
    """A response made only of punctuation normalizes to empty and is incorrect."""
    result = evaluate_correctness(_exercise(accepted_answers=["went"]), "!!!")
    assert result["isCorrect"] is False


def test_spelling_exact_match():
    """A spelling exercise grades an exact match as correct via exact_match."""
    ex = _exercise(type_="spelling", accepted_answers=["receive"])
    result = evaluate_correctness(ex, "receive")
    assert result == {"isCorrect": True, "score": 1.0, "evaluationMethod": "exact_match"}


def test_spelling_case_insensitive():
    """A spelling exercise ignores letter case."""
    ex = _exercise(type_="spelling", accepted_answers=["receive"])
    result = evaluate_correctness(ex, "Receive")
    assert result["isCorrect"] is True


def test_spelling_one_substitution_tolerated():
    """A spelling exercise still accepts a response identical to the accepted answer."""
    ex = _exercise(type_="spelling", accepted_answers=["receive"])
    result = evaluate_correctness(ex, "receiv e".replace(" ", ""))  # no-op, sanity
    assert result["isCorrect"] is True


def test_spelling_one_letter_off():
    """A spelling exercise tolerates a single letter substitution via edit_distance."""
    ex = _exercise(type_="spelling", accepted_answers=["definitely"])
    result = evaluate_correctness(ex, "definitly")
    assert result["isCorrect"] is True
    assert result["evaluationMethod"] == "edit_distance"


def test_spelling_one_letter_transposed_within_tolerance():
    """A spelling exercise tolerates a common single-letter misspelling."""
    ex = _exercise(type_="spelling", accepted_answers=["separate"])
    # "seperate" is one substitution away from "separate" (a -> e)
    result = evaluate_correctness(ex, "seperate")
    assert result["isCorrect"] is True


def test_spelling_too_many_errors_rejected():
    """A spelling exercise rejects a response more than one edit away."""
    ex = _exercise(type_="spelling", accepted_answers=["receive"])
    result = evaluate_correctness(ex, "recieved")  # 2 edits away
    assert result["isCorrect"] is False
    assert result["evaluationMethod"] == "edit_distance"


def test_spelling_completely_different_word():
    """A spelling exercise rejects a response unrelated to the accepted answer."""
    ex = _exercise(type_="spelling", accepted_answers=["umbrella"])
    result = evaluate_correctness(ex, "banana")
    assert result["isCorrect"] is False


def test_spelling_empty_response():
    """A spelling exercise rejects an empty response."""
    ex = _exercise(type_="spelling", accepted_answers=["umbrella"])
    result = evaluate_correctness(ex, "")
    assert result["isCorrect"] is False


def test_spelling_extra_letter():
    """A spelling exercise tolerates one extra letter via edit_distance."""
    ex = _exercise(type_="spelling", accepted_answers=["umbrella"])
    result = evaluate_correctness(ex, "umbrellaa")
    assert result["isCorrect"] is True
    assert result["evaluationMethod"] == "edit_distance"


def test_spelling_missing_letter():
    """A spelling exercise tolerates one missing letter via edit_distance."""
    ex = _exercise(type_="spelling", accepted_answers=["umbrella"])
    result = evaluate_correctness(ex, "umbrell")
    assert result["isCorrect"] is True


def test_spelling_multiple_accepted_answers():
    """A spelling exercise accepts a match against any entry in a multi-answer list."""
    ex = _exercise(type_="spelling", accepted_answers=["color", "colour"])
    result = evaluate_correctness(ex, "colour")
    assert result["isCorrect"] is True


def test_edit_distance_identical_strings_via_spelling():
    """Identical strings are graded exact_match, not edit_distance, even for spelling."""
    ex = _exercise(type_="spelling", accepted_answers=["cat"])
    result = evaluate_correctness(ex, "cat")
    assert result["evaluationMethod"] == "exact_match"


def test_edit_distance_two_letters_off_rejected():
    """A spelling exercise rejects a response two or more edits away."""
    ex = _exercise(type_="spelling", accepted_answers=["cat"])
    result = evaluate_correctness(ex, "dog")
    assert result["isCorrect"] is False
