# ml/datasets

Labeled data for the mistake-detection classifier (Phase 3b/3c of
`docs/local_first_intelligent_english_learning_plan.md`).

## Schema (`errors_v1.jsonl`)

One JSON object per line:

```json
{"text": "He go to school every day.", "labels": ["subject_verb_agreement"]}
```

- `text` — the learner sentence (str).
- `labels` — zero or more of the 6 labels in
  `server/mistake_detection.py`'s `ERROR_CONCEPT_MAP` (`subject_verb_agreement`,
  `verb_tense`, `article_usage`, `preposition_usage`, `pluralization`,
  `sentence_fragment`). `[]` marks a clean (no-error) example, used to
  measure the classifier's false-positive rate.

Validate with `python3 ml/datasets/validate_errors.py`.

## Versioning

Datasets are versioned by filename (`errors_v1.jsonl`, `errors_v2.jsonl`,
...) rather than mutated in place once a version has been used to train
and evaluate a registered model — that keeps past eval results
reproducible against the exact data that produced them. Add new examples
by creating the next version file, not by editing an existing one.
