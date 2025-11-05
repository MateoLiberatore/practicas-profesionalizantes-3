import sys
import os
import pytest
import sqlite3
from unittest.mock import Mock
from flask import Flask
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv

from src.routes.auth.auth_routes import auth_bp
from src.routes.llm.gemini_route import gemini_bp

load_dotenv()

from src.models.user_model import UserModel
from src.services import auth_service
from src.utils import auth_utils
from src.utils.error_handler import register_error_handlers, APIError


@pytest.fixture(scope='session')
def app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret_key_for_testing_jwt'
    register_error_handlers(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(gemini_bp)

    with app.app_context():
        yield app


@pytest.fixture(scope='session')
def client(app):
    return app.test_client()


@pytest.fixture(scope='function')
def db_session():
    conn = sqlite3.connect(':memory:')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    """)
    conn.commit()

    class MockUserModel(UserModel):
        def connect(self):
            return conn

        def create_user(self, username, email, password):
            try:
                cursor.execute(
                    """
                    INSERT INTO users (username, email, password) VALUES (?,?,?)
                    """,
                    (username, email, password)
                )
                conn.commit()
                user_id = cursor.lastrowid
                return {
                    "id": user_id,
                    "username": username,
                    "email": email
                }
            except sqlite3.IntegrityError:
                raise APIError("The username or email already exists.", status_code=409)
            except sqlite3.Error as e:
                raise APIError(f"An error occurred while creating the user in the mock DB: {e}", status_code=500)

        def get_user_by_email(self, email):
            cursor.execute("SELECT * FROM users WHERE email=?", (email,))
            row = cursor.fetchone()
            return dict(row) if row else None

        def get_user_by_name(self, username):
            cursor.execute("SELECT * FROM users WHERE username=?", (username,))
            row = cursor.fetchone()
            return dict(row) if row else None

        def get_user_by_id(self, user_id):
            cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    yield MockUserModel(db_file=':memory:')

    conn.close()


@pytest.fixture(scope='function')
def mock_auth_service_db(mocker, db_session):
    mocker.patch.object(auth_service, 'user_model', db_session)

    try:
        mocker.patch.object(auth_utils, 'user_model', db_session)
    except AttributeError:
        pass

    db_session.create_user(
        'testuser',
        'test@example.com',
        generate_password_hash('password123')
    )
    return db_session


@pytest.fixture(scope='function')
def mock_gemini_api_call(mocker):
    mock_response = Mock()
    mock_response.text = '```python\ndef generated_function():\n    return True\n```'

    patcher = mocker.patch(
        'src.services.gemini_service._call_gemini_api',
        return_value=mock_response
    )
    return patcher
