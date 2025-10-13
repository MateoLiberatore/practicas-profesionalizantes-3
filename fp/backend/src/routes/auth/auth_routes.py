# src/routes/auth_routes.py
from flask import Blueprint, jsonify, request
from src.controllers.auth_controller import AuthController
from src.utils.error_handler import APIError
from flask_login import logout_user, login_required, current_user

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

    user_data = AuthController.handle_login(data)
    return jsonify({"message": "Login exitoso", "user": user_data}), 200


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Sesión cerrada exitosamente"}), 200


@auth_bp.route('/profile', methods=['GET'])
@login_required
def get_profile():
    return jsonify({"message": "Acceso exitoso", "user": current_user.username}), 200