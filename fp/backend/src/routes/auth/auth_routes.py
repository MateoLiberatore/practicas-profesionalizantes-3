# src/routes/auth/auth_routes.py

from flask import Blueprint, jsonify, request, g
from src.controllers.auth_controller import AuthController
from src.utils.error_handler import APIError
from src.utils.auth_utils import jwt_required 

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data or 'email' not in data:
        raise APIError("Petición inválida. Se espera JSON con 'username', 'email' y 'password'.", status_code=400)
    
    user_data = AuthController.handle_registration(data)
    return jsonify({"message": "Registro exitoso", "user": user_data}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data: 
        raise APIError("Petición inválida. Se espera JSON con 'email' y 'password'.", status_code=400)

    # El servicio devuelve {token:..., user:...}
    user_data = AuthController.handle_login(data)
    
    # **IMPORTANTE:** La respuesta de login debe ser {token:..., user:...} para pasar el test
    return jsonify({"message": "Login exitoso", "data": user_data}), 200


@auth_bp.route('/logout', methods=['POST'])
@jwt_required 
def logout():
    return jsonify({"message": "Sesión cerrada exitosamente. El token expirará automáticamente."}), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required 
def get_profile():
    # Acceso a los datos cargados por jwt_required en g.current_user
    user_info = g.current_user
    
    # Aquí el test espera que el email sea 'test@example.com'.
    return jsonify({"message": "Acceso exitoso", "user": user_info}), 200