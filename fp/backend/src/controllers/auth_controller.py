from src.services.auth_service import register_user, authenticate_user
from src.utils.error_handler import APIError


class AuthController:
    
    def __init__(self):
        pass

    def handle_registration(data):
        return register_user(data)

    def handle_login(data):
        return authenticate_user(data.get('email'), data.get('password'))