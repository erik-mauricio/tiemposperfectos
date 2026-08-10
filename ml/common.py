"""
Shared dataset loading + pipeline construction for the mistake-detection
classifier. Kept separate from `server/` per the local-first plan's
"inference locally, training separately" principle (see
`server/tfidf_classifier.py` for the corresponding decoupling on the
serving side — it duplicates ERROR_CONCEPT_MAP rather than importing
from here).

KNOWN_LABELS / ERROR_CONCEPT_MAP mirror server/mistake_detection.py's
taxonomy exactly and must be kept in sync with it by hand.
"""
import json
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.pipeline import Pipeline

ERROR_CONCEPT_MAP = {
    "subject_verb_agreement": "subject_verb_agreement",
    "verb_tense": "simple_past",
    "article_usage": None,
    "preposition_usage": None,
    "pluralization": None,
    "sentence_fragment": None,
}

KNOWN_LABELS = list(ERROR_CONCEPT_MAP.keys())


def load_dataset(path: Path) -> tuple[list[str], list[list[str]]]:
    """
    Loads a labeled dataset in the ml/datasets/*.jsonl schema (see
    ml/datasets/README.md).

    Returns:
        (texts, label_lists) — parallel lists; label_lists[i] is [] for a
        clean example.
    """
    texts, label_lists = [], []
    for line in path.open():
        line = line.strip()
        if not line:
            continue
        record = json.loads(line)
        texts.append(record["text"])
        label_lists.append(record["labels"])
    return texts, label_lists


def build_pipeline() -> Pipeline:
    """
    Returns an unfit sklearn Pipeline: TF-IDF (word 1-2 grams, min_df=2)
    into a one-vs-rest, class-weighted logistic regression multi-label
    classifier.

    class_weight="balanced" is required, not a tuning choice — without
    it, predicted probabilities never cross the default 0.5 threshold on
    this dataset's label frequencies (see docs/phases/phase3.md).
    """
    return Pipeline(
        [
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=2)),
            (
                "classifier",
                OneVsRestClassifier(
                    LogisticRegression(max_iter=1000, class_weight="balanced")
                ),
            ),
        ]
    )
