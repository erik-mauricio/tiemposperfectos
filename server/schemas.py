import uuid
from typing import Any, Optional
from pydantic import BaseModel


class ConceptOut(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    parent_id: uuid.UUID | None
    category: str | None
    difficulty: int | None

    model_config = {"from_attributes": True}


class ExerciseOut(BaseModel):
    id: uuid.UUID
    type: str
    prompt: Any
    topic: str | None
    cefr_level: str | None
    accepted_answers: Any
    explanation: str | None
    difficulty: float
    status: str

    model_config = {"from_attributes": True}


class AttemptIn(BaseModel):
    user_id: uuid.UUID
    exercise_id: uuid.UUID
    response: dict
    response_time_ms: Optional[int] = None
    hints_used: int = 0


class AttemptOut(BaseModel):
    id: uuid.UUID
    exercise_id: uuid.UUID
    correct: bool
    score: float
    explanation: str | None

    model_config = {"from_attributes": True}
