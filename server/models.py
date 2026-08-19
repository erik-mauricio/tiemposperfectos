import uuid
from sqlalchemy import Column, Integer, Text, Float, Boolean, SmallInteger, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from database import Base


class Concept(Base):
    """Skill or topic (e.g. simple_past)"""
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
    """A single practice item (e.g. fill-in-the-blank) a 
        learner can attempt."""

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
    """Many-to-many relationship 
    between an exercise and the concept(s) it targets."""

    __tablename__ = "exercise_concepts"
    exercise_id = Column(
        UUID(as_uuid=True), ForeignKey("exercises.id", ondelete="CASCADE"), primary_key=True
    )
    concept_id = Column(
        UUID(as_uuid=True), ForeignKey("concepts.id", ondelete="CASCADE"), primary_key=True
    )
    weight = Column(Float, default=1.0)

class Conversation(Base):
    """A roleplay/open-conversation session and its message history."""

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
    """A learner's graded submission for one exercise (legacy write path, replaced by LearningEvent for new writes)."""

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
    """An immutable record of one learner interaction (exercise attempt, conversation turn, etc.); 
    the source of truth mastery is derived from."""

    __tablename__ = "learning_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    event_type = Column(Text, nullable=False)
    # Expected payload keys: exercise_id, response, is_correct, score,
    # concept_ids, response_time_ms, hint_used, source, detected_error_ids.
    payload = Column(JSONB, nullable=False)
    occurred_at = Column(DateTime(timezone=True), server_default=func.now())
    processed_for_mastery = Column(Boolean, nullable=False, default=False, server_default="false")


class DetectedError(Base):
    """A single detected mistake tied to an Attempt (legacy, replaced by ErrorLabel for new writes)."""

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


class ErrorLabel(Base):
    """ 
    One or more detected mistakes tied to a LearningEvent, 
    with expected/observed text (replaces DetectedError for new writes).
    """
    __tablename__ = "error_labels"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    learning_event_id = Column(
        UUID(as_uuid=True), ForeignKey("learning_events.id", ondelete="CASCADE"), nullable=False
    )
    label = Column(Text, nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=True)
    confidence = Column(Float)
    span_start = Column(Integer, nullable=True)
    span_end = Column(Integer, nullable=True)
    expected = Column(Text, nullable=True)
    observed = Column(Text, nullable=True)
    model_version = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
