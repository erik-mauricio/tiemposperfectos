from database import SessionLocal
from models import Concept

STARTER_CONCEPTS = [
    {
        "slug": "simple_present",
        "name": "Simple Present",
        "category": "grammar",
        "difficulty": 1,
        "description": "Used for habits, facts, and routines (e.g. 'She works every day').",
    },
    {
        "slug": "subject_verb_agreement",
        "name": "Subject-Verb Agreement",
        "category": "grammar",
        "difficulty": 1,
        "description": "Matching a verb's form to its subject (e.g. 'She works', not 'She work').",
    },
    {
        "slug": "simple_past",
        "name": "Simple Past",
        "category": "grammar",
        "difficulty": 2,
        "description": "Used for completed actions in the past (e.g. 'She worked yesterday').",
    },
    {
        "slug": "a_vs_an",
        "name": "A vs. An",
        "category": "grammar",
        "difficulty": 1,
        "description": "Choosing between the indefinite articles 'a' and 'an' based on sound.",
    },
    {
        "slug": "everyday_vocabulary",
        "name": "Everyday Vocabulary",
        "category": "vocabulary",
        "difficulty": 1,
        "description": "Common words used in daily life (e.g. food, family, weather).",
    },
    {
        "slug": "basic_word_order",
        "name": "Basic Word Order",
        "category": "sentence_building",
        "difficulty": 1,
        "description": "Standard English subject-verb-object order (e.g. 'I eat rice').",
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


if __name__ == "__main__":
    seed_concepts()
    print("Seed complete.")
