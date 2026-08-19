"""
Shared pytest fixtures for the server test suite.

Tests run against a real, disposable Postgres database
(`tiemposperfectos_test` by default) rather than SQLite, because the
models use Postgres-specific `UUID`/`JSONB` column types. Each test gets
its own transaction that is rolled back afterward, so tests never leak
state into each other or into the dev database.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker

from database import DATABASE_URL, Base
import models  # noqa: F401 -- registers models on Base.metadata


def _test_database_url() -> str:
    explicit = os.getenv("TEST_DATABASE_URL")
    if explicit:
        return explicit
    # Derive "<name>_test" from DATABASE_URL's trailing db name, so a
    # plain `pytest` run doesn't require extra env setup once the test
    # database itself exists.
    base, _, db_name = DATABASE_URL.rpartition("/")
    return f"{base}/{db_name}_test"


@pytest.fixture(scope="session")
def engine():
    return create_engine(_test_database_url())


@pytest.fixture()
def db_session(engine):
    """
    Yields a SQLAlchemy session bound to a single connection/transaction
    that is rolled back at the end of the test, using the standard
    "join into an external transaction" recipe so that app code calling
    `session.commit()` doesn't actually persist anything past the test.
    """
    connection = engine.connect()
    outer_transaction = connection.begin()

    SessionLocal = sessionmaker(bind=connection)
    session = SessionLocal()

    session.begin_nested()

    @event.listens_for(session, "after_transaction_end")
    def _restart_savepoint(sess, transaction):
        if transaction.nested and not transaction._parent.nested:
            sess.begin_nested()

    try:
        yield session
    finally:
        session.close()
        outer_transaction.rollback()
        connection.close()


@pytest.fixture()
def client(db_session):
    """
    A FastAPI TestClient with the app's `get_db` dependency overridden to
    use the test transaction from `db_session`, so requests made through
    the client see (and roll back with) the same test data.
    """
    from fastapi.testclient import TestClient
    from database import get_db
    from main import app

    def _override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = _override_get_db
    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(get_db, None)
