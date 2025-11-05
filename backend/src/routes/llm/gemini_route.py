from flask import Blueprint, jsonify, request
from src.controllers.gemini_controller import Gemini_Controller
from src.utils.error_handler import APIError
from src.utils.auth_utils import jwt_required

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/process", methods=["POST", "OPTIONS"])
@jwt_required
def process_task():
    payload = request.get_json()
    if not payload:
        raise APIError("Petición inválida: se esperaba JSON.", status_code=400)

    response = Gemini_Controller.handle_process_task(payload)
    return jsonify(response), 200

