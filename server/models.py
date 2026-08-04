import uuid
from sqlalchemy import Column, Integer, Text, Float, Boolean, SmallInteger, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from database import Base


class Concept(Base):
    __tablename__ = "concepts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(Text, unique=True, nullable=False)
    name = Column(Text, nullable=False)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=True)
    category = Column(Text)
    difficulty = Column(SmallInteger)
    extra_metadata = Column("metadata", JSONB, nullable=False, default=dict, server_default="{}")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(Text, nullable=False)
    prompt = Column(JSONB, nullable=False)
    topic = Column(Text)
    cefr_level = Column(Text)
    accepted_answers = Column(JSONB)
    explanation = Column(Text)
    difficulty = Column(Float, nullable=False)
    status = Column(Text, default="published")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ExerciseConcept(Base):
    __tablename__ = "exercise_concepts"
    exercise_id = Column(
        UUID(as_uuid=True), ForeignKey("exercises.id", ondelete="CASCADE"), primary_key=True
    )
    concept_id = Column(
        UUID(as_uuid=True), ForeignKey("concepts.id", ondelete="CASCADE"), primary_key=True
    )
    weight = Column(Float, default=1.0)

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(Text, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=False) 
    prompt = Column(JSONB)
    messages = Column(JSONB, default=list) 
    status = Column(Text, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Attempt(Base):
    __tablename__ = "attempts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    exercise_id = Column(UUID(as_uuid=True), ForeignKey("exercises.id"), nullable=False)
    response = Column(JSONB, nullable=False)
    correct = Column(Boolean)
    score = Column(Float)
    response_time_ms = Column(Integer)
    hints_used = Column(Integer, default=0)
    attempted_at = Column(DateTime(timezone=True), server_default=func.now())


class LearningEvent(Base):
    __tablename__ = "learning_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    event_type = Column(Text, nullable=False)
    payload = Column(JSONB, nullable=False)
    occurred_at = Column(DateTime(timezone=True), server_default=func.now())


class DetectedError(Base):
    __tablename__ = "detected_errors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    attempt_id = Column(
        UUID(as_uuid=True), ForeignKey("attempts.id", ondelete="CASCADE"), nullable=False
    )
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=True)
    error_type = Column(Text, nullable=False)
    confidence = Column(Float)
    text_span = Column(JSONB)
    correction = Column(Text)
    model_version = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
