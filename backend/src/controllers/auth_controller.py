from src.services.auth_service import register_user, authenticate_user
from src.utils.error_handler import APIError


class AuthController:
    
    def __init__(self):
        pass
    
    @staticmethod
    def handle_registration(data):
        
        try:
            register_user = register_user(data)
            return register_user
        
        except APIError as e:
            raise e
        except Exception as e:
            print(f"Internal error in AuthController: {e}") 
            raise APIError("Internal server error while processing the authentication task.", status_code=500)
    
    @staticmethod
    def handle_login(data):

        try:
            auth_user = authenticate_user(data.get('email'), data.get('password'))
            return auth_user
        
        except APIError as e:
            raise e
        except Exception as e:
            print(f"Internal error in AuthController: {e}") 
            raise APIError("Internal server error while processing the authentication task.", status_code=500)