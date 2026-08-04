import re

MODEL_VERSION = "rules-v1"

ERROR_CONCEPT_MAP = {
    "subject_verb_agreement": "subject_verb_agreement",
    "verb_tense": "simple_past",
    "article_usage": None,
    "preposition_usage": None,
    "pluralization": None,
    "sentence_fragment": None,
}

THIRD_PERSON_SINGULAR_SUBJECTS = {"he", "she", "it"}

IRREGULAR_BASE_TO_THIRD_PERSON = {
    "have": "has",
    "go": "goes",
    "do": "does",
}

VOWEL_SOUND_EXCEPTIONS_STARTS_WITH_VOWEL_LETTER = {"unicorn", "university", "one"}
CONSONANT_SOUND_EXCEPTIONS_STARTS_WITH_CONSONANT_LETTER = {"hour", "honest", "honor"}

PAST_TIME_MARKERS = {"yesterday", "last week", "last night", "last year", "ago"}

DURATION_PATTERN = re.compile(
    r"\bsince\s+(\w+\s+)?(year|years|month|months|week|weeks|day|days)\b",
    re.IGNORECASE,
)

FINITE_VERB_HINTS = {
    "is",
    "am",
    "are",
    "was",
    "were",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "can",
    "will",
    "go",
    "goes",
    "went",
    "work",
    "works",
    "worked",
    "eat",
    "eats",
    "ate",
    "live",
    "lives",
    "lived",
    "like",
    "likes",
    "liked",
    "saw",
    "see",
    "sees",
    "said",
    "say",
    "says",
    "made",
    "make",
    "makes",
    "took",
    "take",
    "takes",
    "came",
    "come",
    "comes",
    "gave",
    "give",
    "gives",
    "knew",
    "know",
    "knows",
    "thought",
    "think",
    "thinks",
    "found",
    "find",
    "finds",
    "told",
    "tell",
    "tells",
    "became",
    "become",
    "becomes",
    "left",
    "leave",
    "leaves",
    "put",
    "puts",
    "brought",
    "bring",
    "brings",
    "began",
    "begin",
    "begins",
    "kept",
    "keep",
    "keeps",
    "wrote",
    "write",
    "writes",
    "heard",
    "hear",
    "hears",
    "ran",
    "run",
    "runs",
    "bought",
}

NUMBER_WORDS = {
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "ten": "10",
}


def _tokenize(text: str) -> list[str]:
    """
    Tokenizes the given 'text' by lowercase splits it into word tokens, stripping punctuation
    and digits (apostrophes kept for contractions).

    Parameters:
        text: str — raw input, e.g. "She go to the store yesterday."

    Returns:
        list[str] — lowercase tokens, e.g. ["she", "go", "to", "the",
        "store", "yesterday"]. [] if no letters found.
    """
    return re.findall(r"[a-zA-Z']+", text.lower())


def _make_error(label, text_span, suggested_correction, confidence=0.85):
    """
    Builds a single error dict in the shared shape all rule functions return.

    Parameters:
        label: str — error category, e.g. "subject_verb_agreement". Looked
            up in `ERROR_CONCEPT_MAP`; unknown labels resolve to concept=None.
        text_span: str — flagged substring, e.g. "go".
        suggested_correction: str | None — corrected form, e.g. "goes".
            None when no single correction applies.
        confidence: float — fixed heuristic score, default 0.85.

    Returns:
        dict — {"label", "concept", "text_span", "suggested_correction",
        "confidence"}.
    """
    return {
        "label": label,
        "concept": ERROR_CONCEPT_MAP.get(label),
        "text_span": text_span,
        "suggested_correction": suggested_correction,
        "confidence": confidence,
    }


def check_subject_verb_agreement(text: str) -> list[dict]:
    """
    Flags third-person singular subjects ("he"/"she"/"it") followed by a
    verb in the wrong form.

    Checks two patterns per adjacent subject-verb pair: an irregular base
    used instead of its third-person form (`IRREGULAR_BASE_TO_THIRD_PERSON`),
    or a known finite verb missing its "-s" ending that isn't a hardcoded
    past-tense/be-verb exception. Only third-person singular subjects are
    checked.

    Parameters:
        text: str — e.g. "He go to school every day."

    Returns:
        list[dict] — one error per mismatch (see `_make_error`). [] if none.
    """
    errors = []
    tokens = _tokenize(text)
    for i in range(len(tokens) - 1):
        subject, verb = tokens[i], tokens[i + 1]
        if subject not in THIRD_PERSON_SINGULAR_SUBJECTS:
            continue
        if verb in IRREGULAR_BASE_TO_THIRD_PERSON:
            correction = IRREGULAR_BASE_TO_THIRD_PERSON[verb]
            errors.append(_make_error("subject_verb_agreement", verb, correction))
        elif verb in FINITE_VERB_HINTS and not verb.endswith("s") and verb not in {
            "was", "were", "is", "am", "are", "did", "had", "went", "ate", "worked", "lived", "liked",
        }:
            errors.append(_make_error("subject_verb_agreement", verb, verb + "s"))
    return errors


def check_article_usage(text: str) -> list[dict]:
    """
    Flags "a"/"an" mismatches based on the following word's sound (not
    just its first letter).

    A vowel-letter start normally takes "an", except words in
    `CONSONANT_SOUND_EXCEPTIONS_STARTS_WITH_CONSONANT_LETTER` (e.g.
    "honest", vowel sound despite starting with "h"). Words in
    `VOWEL_SOUND_EXCEPTIONS_STARTS_WITH_VOWEL_LETTER` (e.g. "university")
    start with a vowel letter but consonant sound, so they take "a".

    Parameters:
        text: str — e.g. "I saw a elephant and an university today."

    Returns:
        list[dict] — one error per mismatched article (see `_make_error`).
        [] if all articles match.
    """
    errors = []
    for match in re.finditer(r"\b(a|an)\s+(\w+)", text, re.IGNORECASE):
        article, following_word = match.group(1).lower(), match.group(2).lower()
        starts_with_vowel_letter = following_word[0] in "aeiou"
        should_be_an = starts_with_vowel_letter
        if following_word in VOWEL_SOUND_EXCEPTIONS_STARTS_WITH_VOWEL_LETTER:
            should_be_an = False
        if following_word in CONSONANT_SOUND_EXCEPTIONS_STARTS_WITH_CONSONANT_LETTER:
            should_be_an = True

        if article == "a" and should_be_an:
            errors.append(
                _make_error("article_usage", match.group(0), "an " + following_word)
            )
        elif article == "an" and not should_be_an:
            errors.append(
                _make_error("article_usage", match.group(0), "a " + following_word)
            )
    return errors


def check_pluralization(text: str) -> list[dict]:
    """
    Flags a number (digit 2+, multi-digit, or a word in `NUMBER_WORDS`)
    followed by a non-pluralized noun.

    "one" is never flagged (excluded from the numeric pattern). Words that
    are known verbs (`FINITE_VERB_HINTS`) are skipped to avoid false
    positives like "runs three times".

    Parameters:
        text: str — e.g. "I have three cat."

    Returns:
        list[dict] — one error per unpluralized noun (see `_make_error`).
        [] if none found.
    """
    errors = []
    number_pattern = r"[2-9]|\d{2,}|" + "|".join(NUMBER_WORDS)
    for match in re.finditer(rf"\b({number_pattern})\s+(\w+)", text, re.IGNORECASE):
        noun = match.group(2)
        if noun.lower() in FINITE_VERB_HINTS:
            continue
        if not noun.lower().endswith("s"):
            errors.append(
                _make_error("pluralization", match.group(0), f"{match.group(1)} {noun}s")
            )
    return errors


def check_verb_tense(text: str) -> list[dict]:
    """
    Flags present-tense "go"/"eat"/"buy" (and "-s" forms) used alongside a
    past-time marker (`PAST_TIME_MARKERS`), suggesting the past-tense form.

    If no past-time marker is present anywhere in `text`, returns []
    immediately without checking any verbs.

    Parameters:
        text: str — e.g. "I go to the park yesterday."

    Returns:
        list[dict] — one error per flagged verb (see `_make_error`). []
        if no past-time marker or no matching verb.
    """
    errors = []
    lowered = text.lower()
    has_past_marker = any(marker in lowered for marker in PAST_TIME_MARKERS)
    if not has_past_marker:
        return errors

    tokens = _tokenize(text)
    for token in tokens:
        if token in {"go", "goes"}:
            errors.append(_make_error("verb_tense", token, "went"))
        elif token in {"eat", "eats"}:
            errors.append(_make_error("verb_tense", token, "ate"))
        elif token in {"buy", "buys"}:
            errors.append(_make_error("verb_tense", token, "bought"))
    return errors


def check_preposition_usage(text: str) -> list[dict]:
    """
    Flags "since <duration>" (e.g. "since three days") via
    `DURATION_PATTERN`, suggesting "for" instead of "since". Only checks
    this one preposition confusion.

    Parameters:
        text: str — e.g. "I have lived here since three years."

    Returns:
        list[dict] — one error per match (see `_make_error`). [] if the
        pattern doesn't appear.
    """
    errors = []
    for match in DURATION_PATTERN.finditer(text):
        errors.append(
            _make_error(
                "preposition_usage",
                match.group(0),
                match.group(0).replace("since", "for", 1),
            )
        )
    return errors


def check_sentence_fragment(text: str) -> list[dict]:
    """
    Flags `text` as a likely fragment if it contains no recognizable finite
    verb (`FINITE_VERB_HINTS`).

    Whole-text check, not per-clause: multi-sentence input with a verb
    anywhere won't be flagged; fragments using unlisted verbs will be a
    false positive. Empty/punctuation-only text returns [] rather than
    flagging.

    Parameters:
        text: str — e.g. "Running very fast today."

    Returns:
        list[dict] — at most one error, confidence fixed at 0.6, no
        suggested correction (see `_make_error`). [] if a finite verb is
        found or there are no tokens.
    """
    tokens = set(_tokenize(text))
    if tokens and not (tokens & FINITE_VERB_HINTS):
        return [_make_error("sentence_fragment", text.strip(), None, confidence=0.6)]
    return []


RULES = [
    check_subject_verb_agreement,
    check_article_usage,
    check_pluralization,
    check_verb_tense,
    check_preposition_usage,
    check_sentence_fragment,
]


def detect_errors(text: str) -> dict:
    """
    Runs every rule in `RULES` against `text` and merges results into one
    output, matching the shape the future ML classifier is expected to
    produce.

    Rules run independently; overlapping or contradictory flags from
    different rules are all kept, with no deduplication.

    Parameters:
        text: str — learner's free-text submission, e.g. "He go to the
            store yesterday and buy a apple."

    Returns:
        dict — {"errors": list[dict], "corrected_text": None,
        "model_version": "rules-v1"}. `errors` is [] if no rule fires.
        `corrected_text` is always None here; reserved for a future model.
    """
    errors = []
    for rule in RULES:
        errors.extend(rule(text))
    return {
        "errors": errors,
        "corrected_text": None,
        "model_version": MODEL_VERSION,
    }