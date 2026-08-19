import json

from llm_error_classifier import ErrorClassifierProvider, classify_errors


class FakeProvider(ErrorClassifierProvider):
    """Returns each of `responses` in order, one per call to classify()."""

    def __init__(self, responses):
        self.responses = list(responses)
        self.calls = 0

    def classify(self, prompt: str) -> str:
        response = self.responses[self.calls]
        self.calls += 1
        return response


def _call(responses, exercise_type="free_response", prompt="What did you do?", concepts=None, text="I go yesterday."):
    provider = FakeProvider(responses)
    result = classify_errors(exercise_type, prompt, concepts or [], text, provider=provider)
    return result, provider


def test_valid_response_with_known_label_and_concept_is_kept():
    """A well-formed response naming a real label/concept passes through unchanged."""
    response = json.dumps(
        {
            "errors": [
                {
                    "label": "verb_tense",
                    "concept": "simple_past",
                    "text_span": "go",
                    "suggested_correction": "went",
                    "confidence": 0.9,
                }
            ]
        }
    )
    result, provider = _call([response])
    assert result["errors"] == [
        {
            "label": "verb_tense",
            "concept": "simple_past",
            "text_span": "go",
            "suggested_correction": "went",
            "confidence": 0.9,
        }
    ]
    assert provider.calls == 1


def test_unknown_label_is_dropped():
    """An error naming a label outside the taxonomy is silently dropped, not raised."""
    response = json.dumps(
        {"errors": [{"label": "made_up_label", "concept": "simple_past", "text_span": "go"}]}
    )
    result, _ = _call([response])
    assert result["errors"] == []


def test_unknown_concept_is_nulled_but_error_kept():
    """An error with an unrecognized concept slug keeps the error but clears the concept."""
    response = json.dumps(
        {"errors": [{"label": "verb_tense", "concept": "made_up_concept", "text_span": "go"}]}
    )
    result, _ = _call([response])
    assert len(result["errors"]) == 1
    assert result["errors"][0]["concept"] is None


def test_off_target_concept_is_still_kept():
    """An error whose concept isn't among the exercise's expected concepts is still returned (full-taxonomy validation, not relevance filtering)."""
    response = json.dumps(
        {"errors": [{"label": "spelling", "concept": "spelling", "text_span": "recieve"}]}
    )
    result, _ = _call([response], concepts=["simple_past"])
    assert len(result["errors"]) == 1
    assert result["errors"][0]["concept"] == "spelling"


def test_multi_error_response_keeps_all_valid_entries():
    """Multiple valid errors in one response are all kept."""
    response = json.dumps(
        {
            "errors": [
                {"label": "verb_tense", "concept": "simple_past", "text_span": "go"},
                {"label": "article_usage", "concept": "article_usage", "text_span": "a apple"},
            ]
        }
    )
    result, _ = _call([response])
    assert len(result["errors"]) == 2


def test_empty_errors_list_is_valid():
    """An explicit empty errors list is a valid, well-formed response."""
    result, provider = _call([json.dumps({"errors": []})])
    assert result["errors"] == []
    assert provider.calls == 1


def test_malformed_json_first_call_valid_second_call_retries_successfully():
    """Malformed JSON on the first call triggers a retry that succeeds."""
    valid = json.dumps({"errors": []})
    result, provider = _call(["not json at all", valid])
    assert result["errors"] == []
    assert provider.calls == 2


def test_malformed_json_on_both_calls_falls_back_to_empty():
    """Malformed JSON on every attempt falls back to an empty errors list, never raises."""
    result, provider = _call(["not json", "still not json"])
    assert result["errors"] == []
    assert provider.calls == 2


def test_missing_errors_key_is_treated_as_malformed():
    """A response missing the top-level 'errors' key is treated as malformed, not crashed on."""
    result, provider = _call([json.dumps({"something_else": []}), json.dumps({"errors": []})])
    assert result["errors"] == []
    assert provider.calls == 2


def test_errors_not_a_list_is_treated_as_malformed():
    """A response where 'errors' isn't a list is treated as malformed."""
    result, provider = _call([json.dumps({"errors": "not a list"}), json.dumps({"errors": []})])
    assert result["errors"] == []
    assert provider.calls == 2


def test_provider_exception_is_treated_as_a_failed_attempt():
    """If the provider raises, that attempt is treated as failed and a retry is attempted."""

    class RaisingThenValidProvider(ErrorClassifierProvider):
        def __init__(self):
            self.calls = 0

        def classify(self, prompt):
            self.calls += 1
            if self.calls == 1:
                raise RuntimeError("network error")
            return json.dumps({"errors": []})

    provider = RaisingThenValidProvider()
    result = classify_errors("free_response", "prompt", [], "text", provider=provider)
    assert result["errors"] == []
    assert provider.calls == 2


def test_result_includes_model_version():
    """The result always includes a model_version string."""
    result, _ = _call([json.dumps({"errors": []})])
    assert "model_version" in result
    assert isinstance(result["model_version"], str)


def test_no_gemini_api_key_degrades_to_empty_errors(monkeypatch):
    """With no GEMINI_API_KEY and no injected provider, classify_errors degrades gracefully instead of raising."""
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    result = classify_errors("free_response", "prompt", [], "text")
    assert result["errors"] == []
