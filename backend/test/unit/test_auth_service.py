import pytest
import json
from src.utils.auth_utils import create_jwt_token, get_secret_key
import jwt
import datetime

@pytest.fixture
def auth_header(app, mock_auth_service_db):
    user = mock_auth_service_db.get_user_by_email('test@example.com')
    if not user:
        return None 
        
    with app.app_context():
        token = create_jwt_token(user['id'])
    return {'Authorization': f'Bearer {token}'}

def test_register_route_success(client):
    new_user_data = {
        'username': 'integration_user',
        'email': 'integration@example.com',
        'password': 'safe_pass_test'
    }
    response = client.post('/auth/register', json=new_user_data)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'Registration successful' in data['message']
    assert data['user']['email'] == 'integration@example.com'

def test_login_route_success(client):
    login_data = {
        'email': 'test1@example.com',
        'password': 'password123'
    }
    response = client.post('/auth/login', json=login_data)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Login successful' in data['message']
    assert 'token' in data['data']
    assert 'user' in data['data']
    assert 'password' not in data['data']['user']

def test_login_route_invalid_credentials(client):
    login_data = {
        'email': 'test@example.com',
        'password': 'wrong_password'
    }
    response = client.post('/auth/login', json=login_data)
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['status'] == 401
    assert data['error_type'] == 'UNAUTHORIZED'
    assert 'Invalid credentials' in data['message']

def test_access_profile_with_valid_jwt(client, auth_header):
    response = client.get('/auth/profile', headers=auth_header)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Successful access' in data['message']
    assert data['user']['email'] == 'test1@example.com'
    assert 'password' not in data['user']

def test_access_profile_without_jwt(client):
    response = client.get('/auth/profile')
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['error_type'] == 'UNAUTHORIZED'
    assert 'Missing authentication token' in data['message']

def test_access_profile_with_invalid_jwt(client):
    invalid_header = {'Authorization': 'Bearer a.b.c'}
    response = client.get('/auth/profile', headers=invalid_header)
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['error_type'] == 'UNAUTHORIZED'
    assert 'Invalid or corrupted JWT token' in data['message']
    
def test_access_profile_with_expired_jwt(client, app):
    with app.app_context():
        secret_key = get_secret_key()
    
    past_time = datetime.datetime.now(datetime.UTC) - datetime.timedelta(hours=1)
    
    expired_payload = {
        'exp': int(past_time.timestamp()),
        'iat': int(past_time.timestamp()),
        'user_id': 1 
    }
    
    expired_token = jwt.encode(
        expired_payload,
        secret_key, 
        algorithm='HS256'
    )
    
    expired_header = {'Authorization': f'Bearer {expired_token}'}
    
    response = client.get('/auth/profile', headers=expired_header)
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['error_type'] == 'UNAUTHORIZED'
    assert 'JWT token has expired' in data['message']
    
def test_logout_route_success(client, auth_header):
    response = client.post('/auth/logout', headers=auth_header)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Session closed successfully' in data['message']