import pytest
from src.services.auth_service import register_user, authenticate_user
from src.utils.error_handler import APIError
from werkzeug.security import check_password_hash
from unittest.mock import patch


def test_register_user_success(mock_auth_service_db):
    data = {
        'username': 'newuser',
        'email': 'new@example.com',
        'password': 'safe_password'
    }
    new_user = register_user(data)
    assert new_user['username'] == 'newuser'

    saved_user = mock_auth_service_db.get_user_by_name('newuser')
    assert check_password_hash(saved_user['password'], 'safe_password')


def test_register_user_duplicate_conflict(mock_auth_service_db):
    data = {
        'username': 'testuser',
        'email': 'duplicate@example.com',
        'password': 'newpassword'
    }

    with pytest.raises(APIError) as e:
        register_user(data)

    assert e.value.status_code == 409
    assert "ya existe" in e.value.message


@patch('src.services.auth_service.create_jwt_token', return_value='TEST_JWT_TOKEN')
def test_authenticate_user_success(mock_create_jwt_token, mock_auth_service_db):
    response = authenticate_user('test@example.com', 'password123')
    assert 'token' in response
    assert response['token'] == 'TEST_JWT_TOKEN'
    assert 'user' in response
    assert response['user']['email'] == 'test@example.com'
    mock_create_jwt_token.assert_called_once()


def test_authenticate_user_invalid_credentials():
    with pytest.raises(APIError) as e:
        authenticate_user('unknown@example.com', 'password123')

    assert e.value.status_code == 401
    assert "Credenciales inválidas" in e.value.message


def test_authenticate_user_wrong_password(mock_auth_service_db):
    with pytest.raises(APIError) as e:
        authenticate_user('test@example.com', 'wrongpassword')

    assert e.value.status_code == 401
    assert "Credenciales inválidas" in e.value.message