from src.models.user_model import UserModel
from werkzeug.security import generate_password_hash, check_password_hash
from src.utils.error_handler import APIError
from src.utils.auth_utils import create_jwt_token

user_model = UserModel()

def register_user(data):
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        raise APIError("Missing required fields.", status_code=400)
    
    hashed_password = generate_password_hash(password)
    
    new_user = user_model.create_user(username, email, hashed_password)
    return new_user

def authenticate_user(email, password):
    
    user_data = user_model.get_user_by_email(email)
    #username = user_model.get.....

    if user_data and check_password_hash(user_data['password'], password):
        
        token = create_jwt_token(user_data['id'])
    
        user_data.pop('password', None) 
        
        return {
            "token": token,
            "user": user_data
        }

    raise APIError("Invalid credentials.", status_code=401)