"""
LLM-based error classifier: a provider-agnostic interface for
turning a learner's free-text response into structured error labels,
using an LLM (currently Gemini) instead of the archived TF-IDF model.

Output validation is against the full taxonomy/concept registry only
(is this a real label, a real concept) not against the calling
exercise's expected concepts. Off-target errors (e.g. a spelling
mistake caught inside a grammar exercise) are kept, not dropped; the
decision of whether an error is "on-target enough" to move mastery
belongs to the mastery-tracking layer. 
"""

import json
import os
from abc import ABC, abstractmethod
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
ERROR_TAXONOMY_PATH = REPO_ROOT / "ml" / "registry" / "error_taxonomy.json"
CONCEPTS_PATH = REPO_ROOT / "ml" / "registry" / "concepts.json"

GEMINI_MODEL_NAME = "gemini-2.5-flash"
MODEL_VERSION = f"{GEMINI_MODEL_NAME}-v1"

MAX_RETRIES = 1


def _load_taxonomy() -> list[dict]:
    return json.loads(ERROR_TAXONOMY_PATH.read_text())


def _load_known_concept_slugs() -> set[str]:
    concepts = json.loads(CONCEPTS_PATH.read_text())
    return {concept["slug"] for concept in concepts}


class ErrorClassifierProvider(ABC):
    """A text-in/text-out LLM provider. Swapping providers is a matter
    of implementing this one method, not touching classify_errors."""

    @abstractmethod
    def classify(self, prompt: str) -> str:
        """Sends `prompt` to the model and returns its raw text response."""
        raise NotImplementedError


class GeminiProvider(ErrorClassifierProvider):
    def __init__(self, api_key: str | None = None):
        # Read at construction time, not import time, so a missing key
        # doesn't break importing this module
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise RuntimeError("GEMINI_API_KEY is not set")

    def classify(self, prompt: str) -> str:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=self.api_key)
        response = client.models.generate_content(
            model=GEMINI_MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
        return response.text


def _build_prompt(exercise_type: str, prompt: str, expected_concepts: list[str], response: str) -> str:
    taxonomy = _load_taxonomy()
    taxonomy_description = "\n".join(
        f"- {entry['label']} ({entry['category']}): {entry['description']}"
        for entry in taxonomy
    )

    return f"""You are an English-language error classifier for a language-learning app.

Known error labels:
{taxonomy_description}

Exercise type: {exercise_type}
Exercise prompt: {prompt}
Concepts this exercise targets: {", ".join(expected_concepts) if expected_concepts else "(none specified)"}
Learner's response: {response}

Identify any errors in the learner's response. You may flag errors on
any known label above, even ones unrelated to the concepts this
exercise targets, flag anything genuinely wrong.

Return ONLY a JSON object of this exact shape, with no other text:
{{
  "errors": [
    {{
      "label": "<one of the known error labels above>",
      "concept": "<the single most relevant concept slug for this error>",
      "text_span": "<the exact substring of the response that is wrong>",
      "suggested_correction": "<corrected text, or null if no single correction applies>",
      "confidence": <float between 0.0 and 1.0>
    }}
  ]
}}

If there are no errors, return {{"errors": []}}.
"""


def _parse_and_validate(raw_response: str, known_labels: set[str], known_concepts: set[str]) -> list[dict] | None:
    try:
        parsed = json.loads(raw_response)
        errors = parsed["errors"]
        if not isinstance(errors, list):
            return None
    except (json.JSONDecodeError, KeyError, TypeError):
        return None

    validated = []
    for error in errors:
        try:
            label = error["label"]
            concept = error.get("concept")
        except (KeyError, TypeError):
            continue

        if label not in known_labels:
            continue
        if concept is not None and concept not in known_concepts:
            concept = None

        validated.append(
            {
                "label": label,
                "concept": concept,
                "text_span": error.get("text_span"),
                "suggested_correction": error.get("suggested_correction"),
                "confidence": error.get("confidence"),
            }
        )
    return validated


def classify_errors(
    exercise_type: str,
    prompt: str,
    expected_concepts: list[str],
    response: str,
    provider: ErrorClassifierProvider | None = None,
) -> dict:
    """
    Returns {"errors": [...], "model_version": str}. Never raises --
    provider failure or malformed output degrades to {"errors": []}
    rather than blocking the caller.
    """
    if provider is None:
        try:
            provider = GeminiProvider()
        except RuntimeError:
            return {"errors": [], "model_version": MODEL_VERSION}

    taxonomy = _load_taxonomy()
    known_labels = {entry["label"] for entry in taxonomy}
    known_concepts = _load_known_concept_slugs()

    llm_prompt = _build_prompt(exercise_type, prompt, expected_concepts, response)

    for _ in range(MAX_RETRIES + 1):
        try:
            raw_response = provider.classify(llm_prompt)
        except Exception:
            continue

        validated = _parse_and_validate(raw_response, known_labels, known_concepts)
        if validated is not None:
            return {"errors": validated, "model_version": MODEL_VERSION}

    return {"errors": [], "model_version": MODEL_VERSION}
