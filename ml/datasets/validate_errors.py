"""
Schema validator for ml/datasets/errors_v1.jsonl.

Checks: every record has "text"/"labels", every label is a member of
KNOWN_LABELS, no duplicate texts, and prints a per-label count summary
(including a "clean" count for zero-label examples).

Run: python3 ml/datasets/validate_errors.py
"""
import json
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from common import KNOWN_LABELS  # noqa: E402

DATASET_PATH = Path(__file__).parent / "errors_v1.jsonl"


def validate() -> list[dict]:
    records = []
    seen_texts = set()
    errors = []

    for line_number, line in enumerate(DATASET_PATH.open(), start=1):
        line = line.strip()
        if not line:
            continue
        record = json.loads(line)

        if "text" not in record or not isinstance(record["text"], str):
            errors.append(f"line {line_number}: missing/invalid 'text'")
            continue
        if "labels" not in record or not isinstance(record["labels"], list):
            errors.append(f"line {line_number}: missing/invalid 'labels'")
            continue

        unknown = set(record["labels"]) - set(KNOWN_LABELS)
        if unknown:
            errors.append(f"line {line_number}: unknown labels {unknown}")

        if record["text"] in seen_texts:
            errors.append(f"line {line_number}: duplicate text {record['text']!r}")
        seen_texts.add(record["text"])

        records.append(record)

    if errors:
        print("VALIDATION FAILED:")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)

    counts = Counter()
    clean_count = 0
    for record in records:
        if not record["labels"]:
            clean_count += 1
        for label in record["labels"]:
            counts[label] += 1

    print(f"OK: {len(records)} total examples, {clean_count} clean")
    for label in KNOWN_LABELS:
        print(f"  {label}: {counts[label]}")

    return records


if __name__ == "__main__":
    validate()
