"""
Fits the class-weighted TF-IDF + logistic regression pipeline
(ml/common.py::build_pipeline) on the full errors_v1 dataset and saves
the trained artifact + a registry entry that server/tfidf_classifier.py
reads at request time.

Run: python3 ml/training/train_error_classifier.py
"""
import json
import sys
from pathlib import Path

import joblib
from sklearn.preprocessing import MultiLabelBinarizer

sys.path.insert(0, str(Path(__file__).parent.parent))
from common import KNOWN_LABELS, build_pipeline, load_dataset  # noqa: E402

MODEL_VERSION = "error_classifier_v1"
DATASET_PATH = Path(__file__).parent.parent / "datasets" / "errors_v1.jsonl"
ARTIFACT_PATH = Path(__file__).parent.parent / "artifacts" / "error_classifier_v1.joblib"
REGISTRY_PATH = Path(__file__).parent.parent / "registry" / "error_classifier_v1.json"
EVAL_REPORT_PATH = (
    Path(__file__).parent.parent / "evaluation" / "reports" / "error_classifier_v1_eval.json"
)


def train() -> None:
    texts, label_lists = load_dataset(DATASET_PATH)
    binarizer = MultiLabelBinarizer(classes=KNOWN_LABELS)
    y = binarizer.fit_transform(label_lists)

    pipeline = build_pipeline()
    pipeline.fit(texts, y)

    ARTIFACT_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump({"pipeline": pipeline, "labels": KNOWN_LABELS}, ARTIFACT_PATH)

    metrics = None
    if EVAL_REPORT_PATH.exists():
        metrics = json.loads(EVAL_REPORT_PATH.read_text())

    REGISTRY_PATH.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY_PATH.write_text(
        json.dumps(
            {
                "model_version": MODEL_VERSION,
                "artifact_path": str(ARTIFACT_PATH.relative_to(ARTIFACT_PATH.parent.parent.parent)),
                "trained_on": str(DATASET_PATH.relative_to(DATASET_PATH.parent.parent.parent)),
                "labels": KNOWN_LABELS,
                "metrics": metrics,
            },
            indent=2,
        )
    )
    print(f"Artifact saved to {ARTIFACT_PATH}")
    print(f"Registry entry written to {REGISTRY_PATH}")


if __name__ == "__main__":
    train()
