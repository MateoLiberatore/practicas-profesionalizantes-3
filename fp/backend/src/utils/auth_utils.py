import os
import jwt
import datetime
from functools import wraps
from flask import request, jsonify, g, current_app
from jwt import ExpiredSignatureError, InvalidSignatureError, DecodeError
from src.utils.error_handler import APIError
from src.models.user_model import UserModel

user_model_instance = UserModel()

def get_secret_key():
    """Obtiene la clave JWT desde config o .env"""
    key = current_app.config.get('SECRET_KEY')
    if key:
        return key
    env_key = os.environ.get("SECRET_KEY")
    if env_key:
        return env_key
    return "default-jwt-secret-key"

def create_jwt_token(user_id):
    """Genera un JWT con expiración de 24 horas"""
    try:
        secret_key = get_secret_key()
        if not secret_key or secret_key == "default-jwt-secret-key":
            raise ValueError("Clave secreta no configurada correctamente.")

        expiration_time = datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=24)
        payload = {
            'exp': int(expiration_time.timestamp()),
            'iat': int(datetime.datetime.now(datetime.UTC).timestamp()),
            'user_id': user_id
        }

        return jwt.encode(payload, secret_key, algorithm='HS256')
    except Exception as e:
        print(f"Error creando JWT: {e}")
        raise APIError("Error interno al generar token JWT.", status_code=500)

def jwt_required(f):
    """Protege rutas con JWT. Permite OPTIONS (preflight CORS) sin ejecutar lógica."""
    @wraps(f)
    def decorated(*args, **kwargs):
        # Permitir preflight CORS
        if request.method == 'OPTIONS':
            response = jsonify({"message": "CORS preflight OK"})
            response.status_code = 200
            
            # Cabeceras requeridas para validar el preflight
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.headers.add('Access-Control-Max-Age', '3600')
            
            return response

        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise APIError("Token faltante o formato inválido.", status_code=401)

        try:
            token = auth_header.split()[1]
            secret_key = get_secret_key()
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            user_id = data.get('user_id')

            if not user_id:
                raise APIError("Token JWT inválido.", status_code=401)

            user_data = user_model_instance.get_user_by_id(user_id)
            if not user_data:
                raise APIError("Usuario no encontrado.", status_code=401)

            # Remover campo password
            user_data.pop('password', None)
            g.current_user = user_data

        except ExpiredSignatureError:
            raise APIError("Token expirado.", status_code=401)
        
        except (InvalidSignatureError, DecodeError):
            raise APIError("Token inválido o corrupto.", status_code=401)
        
        except Exception as e:
            print(f"Error JWT: {e}")
            raise APIError("Error interno de autenticación.", status_code=401)

        return f(*args, **kwargs)
    
    return decorated