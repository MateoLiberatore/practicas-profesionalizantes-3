from flask import Blueprint, request, jsonify, g
from werkzeug.security import check_password_hash
from src.utils.auth_utils import create_jwt_token, jwt_required
from src.utils.error_handler import APIError
from src.models.user_model import UserModel

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

user_model = UserModel() 

@auth_bp.route("/login", methods=["OPTIONS", "POST"])
def login():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise APIError("Email o contraseña no proporcionados.", 400)
    
    user = user_model.get_user_by_email(email)

    if not user:
        raise APIError("El usuario no existe.", 404)
    
    if not check_password_hash(user["password"], password):
        raise APIError("Credenciales inválidas.", 401)
    
    token = create_jwt_token(user["id"])

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "token": token,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"]
        }
    }), 200


@auth_bp.route("/profile", methods=["OPTIONS", "GET"])
@jwt_required
def profile():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    user = g.current_user
    if not user:
        raise APIError("Usuario no encontrado.", 404)

    return jsonify({
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"]
        }
    }), 200
