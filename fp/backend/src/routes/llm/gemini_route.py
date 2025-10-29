from flask import Blueprint, jsonify, request
from src.controllers.gemini_controller import Gemini_Controller
from src.utils.error_handler import APIError
from src.utils.auth_utils import jwt_required

gemini_bp = Blueprint('gemini', __name__, url_prefix='/gemini')

@gemini_bp.route('/process', methods=['POST'])
@jwt_required #middlwware
def process_task():
    payload = request.get_json()
    if not payload:
        raise APIError("Petición inválida. Se espera un objeto JSON.", status_code=400) # [3]

    response_data = Gemini_Controller.handle_process_task(payload)
    
    return jsonify(response_data), 200