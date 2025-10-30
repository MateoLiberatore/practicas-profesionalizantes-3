import os
import jwt
import datetime
from functools import wraps
from flask import request, jsonify, g, current_app
from jwt import ExpiredSignatureError, InvalidSignatureError, DecodeError
from src.utils.error_handler import APIError
from src.models.user_model import UserModel

# Crear una instancia del modelo para ser usada en el decorador/utilidades.
user_model_instance = UserModel()

def get_secret_key():
    # Se recomienda usar la configuración de Flask si la aplicación está en contexto,
    # con una alternativa desde el entorno (o un valor por defecto para desarrollo).
    key = current_app.config.get('SECRET_KEY')
    if key:
        return key
    
    # Intenta obtener la clave de entorno si no está en la configuración de Flask
    secret = os.environ.get("SECRET_KEY")
    if secret:
        return secret

    # Clave por defecto para desarrollo si no se encuentra
    return "default-jwt-secret-key" 

def create_jwt_token(user_id):
    try:
        secret_key = get_secret_key()
        
        if not secret_key or secret_key == "default-jwt-secret-key":
             # Error de configuración que debe ser 500
             raise ValueError("Clave secreta JWT no configurada o usando valor por defecto inseguro.")

        # Duración del token: 24 horas
        expiration_time = datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=24)
        
        payload = {
            'exp': int(expiration_time.timestamp()),
            'iat': int(datetime.datetime.now(datetime.UTC).timestamp()),
            'user_id': user_id
        }
        
        return jwt.encode(payload, secret_key, algorithm='HS256')
        
    except Exception as e:
        # Esto captura el error real (500) y lo relanza como APIError
        print(f"Error interno al crear JWT: {e}")
        raise APIError("Error en la generación de JWT (Clave secreta no disponible o error de codificación).", status_code=500)

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            raise APIError("Token de autenticación faltante o formato incorrecto.", status_code=401)

        try:
            token = auth_header.split()[1]
            secret_key = get_secret_key()
            
            # Decodificación del token
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            user_id = data.get('user_id')
            
            if not user_id:
                raise APIError("Token JWT inválido (ID de usuario faltante).", status_code=401)
            
            # Usar la instancia del modelo para que funcione con el mocking de los tests
            user_data = user_model_instance.get_user_by_id(user_id) 
            
            if not user_data:
                 raise APIError("Usuario asociado al token no encontrado.", status_code=401)
            
            # Aseguramos que la contraseña no se adjunte al contexto global
            user_data.pop('password', None)
            g.current_user = user_data 

        except ExpiredSignatureError:
            raise APIError("Token JWT ha expirado.", status_code=401, payload={'context': 'ExpiredSignatureError'})
        except (InvalidSignatureError, DecodeError, AttributeError):
            raise APIError("Token JWT inválido o corrupto.", status_code=401, payload={'context': 'InvalidToken'})
        except APIError:
            raise 
        except Exception as e:
            print(f"Fallo de autenticación o carga de usuario: {e}")
            raise APIError("Fallo de autenticación.", status_code=401)

        return f(*args, **kwargs)
    
    return decorated