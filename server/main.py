from typing import Optional
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db
from models import Concept, Exercise, ExerciseConcept
from schemas import ConceptOut, ExerciseOut

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/concepts", response_model=list[ConceptOut])
def get_concepts(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Concept)
    if category:
        query = query.filter(Concept.category == category)
    return query.order_by(Concept.difficulty).all()


@app.get("/exercises", response_model=list[ExerciseOut])
def get_exercises(
    concept: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Exercise).filter(Exercise.status == "published")
    if concept:
        query = query.join(
            ExerciseConcept, ExerciseConcept.exercise_id == Exercise.id
        ).join(Concept, Concept.id == ExerciseConcept.concept_id).filter(
            Concept.slug == concept
        )
    return query.all()
