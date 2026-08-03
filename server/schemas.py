import uuid
from typing import Any
from pydantic import BaseModel


class ConceptOut(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    parent_id: uuid.UUID | None
    category: str | None
    difficulty: int | None
    description: str | None

    model_config = {"from_attributes": True}


class ExerciseOut(BaseModel):
    id: uuid.UUID
    type: str
    prompt: Any
    media_url: str | None
    accepted_answers: Any
    explanation: str | None
    difficulty: float
    status: str

    model_config = {"from_attributes": True}
