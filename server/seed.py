import json
from pathlib import Path

from database import SessionLocal
from models import Concept, Exercise, ExerciseConcept

REPO_ROOT = Path(__file__).parent.parent
CONCEPTS_REGISTRY_PATH = REPO_ROOT / "ml" / "registry" / "concepts.json"

# Concepts renamed since the original hand-written seed list, so a slug
# already persisted under the old name gets renamed in place instead of
# being seeded a second time under the new one.
RENAMED_CONCEPT_SLUGS = {
    "a_vs_an": "article_usage",
    "basic_word_order": "word_order",
}


def load_concepts_from_registry() -> list[dict]:
    with open(CONCEPTS_REGISTRY_PATH) as f:
        return json.load(f)


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
        "concept_slugs": ["article_usage"],
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
        "concept_slugs": ["word_order"],
        "type": "sentence_correction",
        "prompt": {"sentence": "Rice I eat."},
        "accepted_answers": ["I eat rice."],
        "explanation": "English word order is subject-verb-object: 'I eat rice.'",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["simple_future"],
        "type": "fill_blank",
        "prompt": {"sentence": "Tomorrow, she ____ (call) the doctor."},
        "accepted_answers": ["will call"],
        "explanation": "Use 'will' + the base verb for the simple future.",
        "difficulty": 2.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["present_continuous"],
        "type": "fill_blank",
        "prompt": {"sentence": "Right now, she ____ (work) on her homework."},
        "accepted_answers": ["is working"],
        "explanation": "The present continuous is formed with 'be' + verb-ing.",
        "difficulty": 2.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["pronouns", "direct_object_pronouns"],
        "type": "sentence_correction",
        "prompt": {"sentence": "I saw she at the park."},
        "accepted_answers": ["I saw her at the park."],
        "explanation": "'Her' is the direct object pronoun form, not 'she'.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["pronouns", "indirect_object_pronouns"],
        "type": "sentence_correction",
        "prompt": {"sentence": "Give the book to I."},
        "accepted_answers": ["Give the book to me."],
        "explanation": "'Me' is the indirect object pronoun form, not 'I'.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["spelling"],
        "type": "spelling",
        "prompt": {"sentence": "I did not recieve your message."},
        "accepted_answers": ["receive"],
        "explanation": "'Receive' follows 'i before e except after c'.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["word_choice"],
        "type": "sentence_correction",
        "prompt": {"sentence": "I am agree with you."},
        "accepted_answers": ["I agree with you."],
        "explanation": "'Agree' is already a verb; it doesn't need 'am' before it.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["main_idea"],
        "type": "reading_comprehension",
        "prompt": {
            "passage": "Maria works at a bakery every morning. She bakes bread, "
            "helps customers, and cleans the shop before it opens. By the time "
            "the doors open, the smell of fresh bread fills the street.",
            "question": "What is the main idea of this passage?",
            "choices": [
                "Maria bakes bread every morning before the shop opens.",
                "Bread has a pleasant smell.",
                "Customers like to visit bakeries.",
            ],
        },
        "accepted_answers": ["Maria bakes bread every morning before the shop opens."],
        "explanation": "The passage centers on Maria's morning routine at the bakery, not on bread's smell or customer preferences generally.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["detail_retrieval"],
        "type": "reading_comprehension",
        "prompt": {
            "passage": "Maria works at a bakery every morning. She bakes bread, "
            "helps customers, and cleans the shop before it opens.",
            "question": "What does Maria do before the shop opens?",
            "choices": [
                "She bakes bread, helps customers, and cleans the shop.",
                "She only bakes bread.",
                "She closes the shop early.",
            ],
        },
        "accepted_answers": ["She bakes bread, helps customers, and cleans the shop."],
        "explanation": "The passage explicitly lists these three tasks as happening before the shop opens.",
        "difficulty": 1.0,
        "cefr_level": "A2",
    },
    {
        "concept_slugs": ["inference"],
        "type": "reading_comprehension",
        "prompt": {
            "passage": "Maria arrived at the bakery an hour earlier than usual. "
            "She wanted everything ready before the big morning rush.",
            "question": "Why did Maria arrive early?",
            "choices": [
                "She expected more customers than usual.",
                "The bakery was closed the day before.",
                "She forgot her keys the previous day.",
            ],
        },
        "accepted_answers": ["She expected more customers than usual."],
        "explanation": "The passage implies, but doesn't directly state, that Maria expected a busier morning ('the big morning rush').",
        "difficulty": 3.0,
        "cefr_level": "B1",
    },
    {
        "concept_slugs": ["vocabulary_in_context"],
        "type": "reading_comprehension",
        "prompt": {
            "passage": "After the long hike, everyone was famished and ate dinner quickly.",
            "question": "In this passage, 'famished' most nearly means:",
            "choices": ["very hungry", "very tired", "very happy"],
        },
        "accepted_answers": ["very hungry"],
        "explanation": "The context ('ate dinner quickly') signals that 'famished' means very hungry.",
        "difficulty": 2.0,
        "cefr_level": "B1",
    },
]


def seed_concepts():
    concepts_data = load_concepts_from_registry()
    slugs = {c["slug"] for c in concepts_data}

    db = SessionLocal()
    try:
        for old_slug, new_slug in RENAMED_CONCEPT_SLUGS.items():
            if new_slug not in slugs:
                continue
            existing = db.query(Concept).filter(Concept.slug == old_slug).first()
            renamed_already = db.query(Concept).filter(Concept.slug == new_slug).first()
            if existing and not renamed_already:
                existing.slug = new_slug
        db.commit()

        # Two-pass insert: concepts first (so every slug has a row and a
        # primary key to reference), then patch parent_id from parent_slug.
        for data in concepts_data:
            parent_slug = data.get("parent_slug")
            if parent_slug and parent_slug not in slugs:
                raise ValueError(
                    f"Concept '{data['slug']}' references unknown parent slug "
                    f"'{parent_slug}'"
                )

            exists = db.query(Concept).filter(Concept.slug == data["slug"]).first()
            if exists:
                continue
            db.add(
                Concept(
                    slug=data["slug"],
                    name=data["name"],
                    category=data["category"],
                    difficulty=data["difficulty"],
                    extra_metadata={
                        "description": data["description"],
                        "example_errors": data["example_errors"],
                    },
                )
            )
        db.commit()

        concepts_by_slug = {c.slug: c for c in db.query(Concept).all()}
        for data in concepts_data:
            parent_slug = data.get("parent_slug")
            if not parent_slug:
                continue
            concept = concepts_by_slug[data["slug"]]
            parent = concepts_by_slug[parent_slug]
            if concept.parent_id != parent.id:
                concept.parent_id = parent.id
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
