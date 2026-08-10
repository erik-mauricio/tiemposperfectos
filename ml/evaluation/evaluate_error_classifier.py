"""
5-fold cross-validated evaluation of the class-weighted TF-IDF +
logistic regression pipeline (ml/common.py::build_pipeline) against
ml/datasets/errors_v1.jsonl.

Run: python3 ml/evaluation/evaluate_error_classifier.py
"""
import json
import sys
from pathlib import Path

import numpy as np
from sklearn.metrics import classification_report, f1_score
from sklearn.model_selection import KFold
from sklearn.preprocessing import MultiLabelBinarizer

sys.path.insert(0, str(Path(__file__).parent.parent))
from common import KNOWN_LABELS, build_pipeline, load_dataset  # noqa: E402

MODEL_VERSION = "error_classifier_v1"
DATASET_PATH = Path(__file__).parent.parent / "datasets" / "errors_v1.jsonl"
REPORT_PATH = Path(__file__).parent / "reports" / "error_classifier_v1_eval.json"

CAVEAT = (
    "errors_v1 is 35 hand-authored examples across 6 labels (~5-6 "
    "positive per label) plus 4 clean examples -- far below the plan's "
    "own '20+ per label' target. Read per-label F1 as a pipeline smoke "
    "test, not a quality claim: class_weight='balanced' is required "
    "(without it, predicted probabilities never cross the default 0.5 "
    "threshold on this dataset), and that fix trades precision for "
    "recall, which is why clean examples get flagged."
)


def evaluate() -> dict:
    texts, label_lists = load_dataset(DATASET_PATH)
    is_clean = [len(labels) == 0 for labels in label_lists]

    binarizer = MultiLabelBinarizer(classes=KNOWN_LABELS)
    y = binarizer.fit_transform(label_lists)

    n = len(texts)
    y_pred = np.zeros_like(y)

    kf = KFold(n_splits=5, shuffle=True, random_state=42)
    for train_idx, test_idx in kf.split(texts):
        pipeline = build_pipeline()
        train_texts = [texts[i] for i in train_idx]
        pipeline.fit(train_texts, y[train_idx])
        test_texts = [texts[i] for i in test_idx]
        y_pred[test_idx] = pipeline.predict(test_texts)

    macro_f1 = f1_score(y, y_pred, average="macro", zero_division=0)
    micro_f1 = f1_score(y, y_pred, average="micro", zero_division=0)
    per_label_report = classification_report(
        y,
        y_pred,
        target_names=KNOWN_LABELS,
        output_dict=True,
        zero_division=0,
    )

    clean_indices = [i for i in range(n) if is_clean[i]]
    false_positive_count = sum(1 for i in clean_indices if y_pred[i].sum() > 0)
    false_positive_rate = (
        false_positive_count / len(clean_indices) if clean_indices else None
    )

    return {
        "model_version": MODEL_VERSION,
        "dataset_version": "errors_v1",
        "cv_method": "5-fold KFold, shuffle=True, random_state=42",
        "n_examples": n,
        "n_positive_examples": n - len(clean_indices),
        "n_clean_examples": len(clean_indices),
        "macro_f1": macro_f1,
        "micro_f1": micro_f1,
        "per_label": {
            label: {
                "precision": per_label_report[label]["precision"],
                "recall": per_label_report[label]["recall"],
                "f1": per_label_report[label]["f1-score"],
                "support": int(per_label_report[label]["support"]),
            }
            for label in KNOWN_LABELS
        },
        "clean_example_false_positive_rate": false_positive_rate,
        "caveat": CAVEAT,
    }


if __name__ == "__main__":
    results = evaluate()
    print(json.dumps(results, indent=2))
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(results, indent=2))
    print(f"\nReport written to {REPORT_PATH}")
