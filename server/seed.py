from database import SessionLocal
from models import Concept, Exercise, ExerciseConcept

STARTER_CONCEPTS = [
    {
        "slug": "simple_present",
        "name": "Simple Present",
        "category": "grammar",
        "difficulty": 1,
        "extra_metadata": {
            "description": "Used for habits, facts, and routines (e.g. 'She works every day')."
        },
    },
    {
        "slug": "subject_verb_agreement",
        "name": "Subject-Verb Agreement",
        "category": "grammar",
        "difficulty": 1,
        "extra_metadata": {
            "description": "Matching a verb's form to its subject (e.g. 'She works', not 'She work')."
        },
    },
    {
        "slug": "simple_past",
        "name": "Simple Past",
        "category": "grammar",
        "difficulty": 2,
        "extra_metadata": {
            "description": "Used for completed actions in the past (e.g. 'She worked yesterday')."
        },
    },
    {
        "slug": "a_vs_an",
        "name": "A vs. An",
        "category": "grammar",
        "difficulty": 1,
        "extra_metadata": {
            "description": "Choosing between the indefinite articles 'a' and 'an' based on sound."
        },
    },
    {
        "slug": "everyday_vocabulary",
        "name": "Everyday Vocabulary",
        "category": "vocabulary",
        "difficulty": 1,
        "extra_metadata": {
            "description": "Common words used in daily life (e.g. food, family, weather)."
        },
    },
    {
        "slug": "basic_word_order",
        "name": "Basic Word Order",
        "category": "sentence_building",
        "difficulty": 1,
        "extra_metadata": {
            "description": "Standard English subject-verb-object order (e.g. 'I eat rice')."
        },
    },
]


EXERCISE_SEEDS = [
    {
        "concept_slugs": ["simple_present"],
        "type": "multiple_choice",
        "prompt": {
            "question": "Choose the correct sentence.",
            "choices": [
                "She work every Saturday.",
                "She works every Saturday.",
                "She working every Saturday.",
            ],
        },
        "accepted_answers": ["She works every Saturday."],
        "explanation": "A third-person singular subject takes a verb ending in -s in the simple present.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["subject_verb_agreement"],
        "type": "fill_blank",
        "prompt": {"sentence": "He ____ (like) coffee."},
        "accepted_answers": ["likes"],
        "explanation": "With 'he', 'she', or 'it', add -s to the verb.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["subject_verb_agreement"],
        "type": "multiple_choice",
        "prompt": {
            "question": "Choose the correct sentence.",
            "choices": ["They is happy.", "They are happy.", "They am happy."],
        },
        "accepted_answers": ["They are happy."],
        "explanation": "With the plural subject 'they', use 'are'.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["simple_past"],
        "type": "fill_blank",
        "prompt": {"sentence": "Yesterday, she ____ (go) to the store."},
        "accepted_answers": ["went"],
        "explanation": "'Go' is irregular in the simple past: go -> went.",
        "difficulty": 2.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["simple_past"],
        "type": "sentence_correction",
        "prompt": {"sentence": "I go to work yesterday."},
        "accepted_answers": ["I went to work yesterday."],
        "explanation": "Use the simple past 'went' for a completed action in the past.",
        "difficulty": 2.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["a_vs_an"],
        "type": "multiple_choice",
        "prompt": {
            "question": "Choose the correct sentence.",
            "choices": ["I saw a elephant.", "I saw an elephant."],
        },
        "accepted_answers": ["I saw an elephant."],
        "explanation": "Use 'an' before a word that starts with a vowel sound.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["everyday_vocabulary"],
        "type": "fill_blank",
        "prompt": {"sentence": "It is raining, so I need my ____."},
        "accepted_answers": ["umbrella"],
        "explanation": "An umbrella protects you from rain.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["basic_word_order"],
        "type": "sentence_correction",
        "prompt": {"sentence": "Rice I eat."},
        "accepted_answers": ["I eat rice."],
        "explanation": "English word order is subject-verb-object: 'I eat rice.'",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
]


def seed_concepts():
    db = SessionLocal()
    try:
        for data in STARTER_CONCEPTS:
            exists = db.query(Concept).filter(Concept.slug == data["slug"]).first()
            if exists:
                continue
            db.add(Concept(**data))
        db.commit()
    finally:
        db.close()


def seed_exercises():
    db = SessionLocal()
    try:
        for data in EXERCISE_SEEDS:
            concept_slugs = data["concept_slugs"]
            concepts = (
                db.query(Concept).filter(Concept.slug.in_(concept_slugs)).all()
            )
            if len(concepts) != len(concept_slugs):
                missing = set(concept_slugs) - {c.slug for c in concepts}
                raise ValueError(f"Seed concepts not found: {missing}")

            exists = (
                db.query(Exercise)
                .join(ExerciseConcept, ExerciseConcept.exercise_id == Exercise.id)
                .filter(
                    ExerciseConcept.concept_id == concepts[0].id,
                    Exercise.prompt == data["prompt"],
                )
                .first()
            )
            if exists:
                continue

            exercise = Exercise(
                type=data["type"],
                prompt=data["prompt"],
                accepted_answers=data["accepted_answers"],
                explanation=data["explanation"],
                difficulty=data["difficulty"],
                topic=data.get("topic"),
                cefr_level=data.get("cefr_level"),
            )
            db.add(exercise)
            db.flush()

            for concept in concepts:
                db.add(
                    ExerciseConcept(exercise_id=exercise.id, concept_id=concept.id)
                )
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed_concepts()
    seed_exercises()
    print("Seed complete.")
