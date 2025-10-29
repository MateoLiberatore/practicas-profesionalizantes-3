import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError, DecodeError
from src.utils.error_handler import APIError
from flask import request, current_app, g  # g es sinonimo de "global", es el contexto de flask para las solicitudes HTTP
from functools import wraps
import datetime

def get_secret_key():
    return current_app.config.get('SECRET_KEY')

def create_jwt_token(user_id):
    try:
        expiration_time = datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=24)

        payload = {
            'exp': expiration_time,
            'iat': datetime.datetime.now(datetime.UTC),
            'user_id': user_id
        }

        token = jwt.encode(
            payload,
            get_secret_key(), 
            algorithm='HS256'
        )
        return token
    except Exception as e:
        raise APIError(f"Error en la generacion de JWT: {e}", status_code=500)
    

def jwt_required(f):
    """Decorador de protección de rutas que valida el JWT."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            raise APIError("Token de autenticación faltante. Se requiere cabecera Authorization Bearer.", status_code=401) 

        try:
            scheme, token = auth_header.split()
        except ValueError:
            raise APIError("Formato de cabecera Authorization inválido. Usar 'Bearer <token>'.", status_code=401)
        
        if scheme.lower()!= 'bearer':
            raise APIError("Esquema de autenticación debe ser 'Bearer'.", status_code=401)

        try:
            #Decodificar y validar el token (verifica firma y expiración)
            payload = jwt.decode(
                token, 
                get_secret_key(), 
                algorithms='HS256'
            ) 
            
            # Almacenar la identidad del usuario en el contexto de Flask (g)
            g.user_id = payload['user_id'] 

        except ExpiredSignatureError:
            raise APIError("Token JWT ha expirado.", status_code=401)
        except (InvalidSignatureError, DecodeError):
            raise APIError("Token JWT inválido o corrupto.", status_code=401)
        except Exception:
            raise APIError("Fallo de autenticación.", status_code=401)

        return f(*args, **kwargs)
    
    return decorated