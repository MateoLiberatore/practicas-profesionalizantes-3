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
            print(f"Error interno en AuthController: {e}") 
            raise APIError("Error interno del servidor al procesar la tarea de autenticacion.", status_code=500)
    
    @staticmethod
    def handle_login(data):

        try:
            auth_user = authenticate_user(data.get('email'), data.get('password'))
            return auth_user
        
        except APIError as e:
            raise e
        except Exception as e:
            print(f"Error interno en AuthController: {e}") 
            raise APIError("Error interno del servidor al procesar la tarea de autenticacion.", status_code=500)