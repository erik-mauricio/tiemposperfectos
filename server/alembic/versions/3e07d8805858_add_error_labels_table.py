"""add error labels table

Revision ID: 3e07d8805858
Revises: edeb0f18c1a1
Create Date: 2026-08-18 19:31:38.676110

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '3e07d8805858'
down_revision: Union[str, Sequence[str], None] = 'edeb0f18c1a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "error_labels",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "learning_event_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("learning_events.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("label", sa.Text(), nullable=False),
        sa.Column(
            "concept_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("concepts.id"),
            nullable=True,
        ),
        sa.Column("confidence", sa.Float(), nullable=True),
        sa.Column("span_start", sa.Integer(), nullable=True),
        sa.Column("span_end", sa.Integer(), nullable=True),
        sa.Column("expected", sa.Text(), nullable=True),
        sa.Column("observed", sa.Text(), nullable=True),
        sa.Column("model_version", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
        ),
    )

    op.add_column(
        "learning_events",
        sa.Column(
            "processed_for_mastery",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("learning_events", "processed_for_mastery")
    op.drop_table("error_labels")
