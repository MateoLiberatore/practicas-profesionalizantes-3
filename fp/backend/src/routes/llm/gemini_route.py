from flask import Blueprint, jsonify, request
from flask_login import login_required 
from src.controllers.gemini_controller import gemini_controller
from src.utils.error_handler import APIError

gemini_bp = Blueprint('gemini', __name__, url_prefix='/gemini')

@gemini_bp.route('/process', methods=['POST'])
@login_required 
def process_task():
    payload = request.get_json()
    
    if not payload:
        raise APIError("Petición inválida. Se espera un objeto JSON.", status_code=400)
    
    try:
        response_data = gemini_controller.handle_process_task(payload)
        
    except APIError as e:
        raise e
    
    except Exception as e:
        print(f"Error inesperado en process_task: {e}")
        raise APIError("Ocurrió un error inesperado al procesar la solicitud de IA.", status_code=500)
        
    return jsonify(response_data), 200