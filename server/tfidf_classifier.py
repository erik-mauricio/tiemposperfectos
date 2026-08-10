import json
from pathlib import Path

import joblib

MODEL_VERSION = "tfidf-v1"

REPO_ROOT = Path(__file__).parent.parent
REGISTRY_PATH = REPO_ROOT / "ml" / "registry" / "error_classifier_v1.json"

# Mirrors server/mistake_detection.py's ERROR_CONCEPT_MAP / ml/common.py's
# KNOWN_LABELS. Kept as a separate copy rather than importing ml/common.py,
# matching the existing "ml/ stays decoupled from server/" convention
# (see ml/features.py) — server/ only needs the trained artifact, not the
# training pipeline code.
ERROR_CONCEPT_MAP = {
    "subject_verb_agreement": "subject_verb_agreement",
    "verb_tense": "simple_past",
    "article_usage": None,
    "preposition_usage": None,
    "pluralization": None,
    "sentence_fragment": None,
}

_artifact = None


def _load_artifact():
    """
    Lazily loads the trained TF-IDF pipeline the first time a prediction is
    needed, then caches it for the life of the process (avoids re-loading
    the joblib file, and a scikit-learn import, on every request).

    Returns:
        dict — {"pipeline": sklearn Pipeline, "labels": list[str]}, or None
        if the artifact file referenced by the registry entry doesn't exist
        (e.g. `ml/` hasn't been set up locally). Callers must treat None as
        "classifier unavailable" and fall back to rules only.
    """
    global _artifact
    if _artifact is not None:
        return _artifact
    if not REGISTRY_PATH.exists():
        return None
    registry_entry = json.loads(REGISTRY_PATH.read_text())
    artifact_path = REPO_ROOT / registry_entry["artifact_path"]
    if not artifact_path.exists():
        return None
    _artifact = joblib.load(artifact_path)
    return _artifact


def predict_errors(text: str) -> list[dict]:
    """
    Runs the trained TF-IDF multi-label classifier on `text` and returns
    predicted error labels in the same per-error dict shape the rules
    (`server/mistake_detection.py`) produce, except `text_span` and
    `suggested_correction` are always None — this classifier only does
    sentence-level classification, it doesn't localize the error.

    Parameters:
        text: str — the learner's free-text submission.

    Returns:
        list[dict] — one entry per label the classifier predicts positive
        (probability >= 0.5), each {"label", "concept", "text_span": None,
        "suggested_correction": None, "confidence"}. [] if the artifact
        isn't available or no label crosses the threshold.
    """
    artifact = _load_artifact()
    if artifact is None:
        return []

    pipeline = artifact["pipeline"]
    labels = artifact["labels"]
    probabilities = pipeline.predict_proba([text])[0]

    errors = []
    for label, probability in zip(labels, probabilities):
        if probability >= 0.5:
            errors.append(
                {
                    "label": label,
                    "concept": ERROR_CONCEPT_MAP.get(label),
                    "text_span": None,
                    "suggested_correction": None,
                    "confidence": float(probability),
                }
            )
    return errors
