# src/models/gemini_model.py
from src.utils.error_handler import APIError

class GeminiRequestModel:
    SUPPORTED_TASK_TYPES = ["code_generation"]

    @staticmethod
    def validate_code_generation_data(data):
        required_fields = ['target_language', 'user_instructions']
        missing = [f for f in required_fields if f not in data]

        if missing:
            raise APIError(f"Faltan campos obligatorios para generación de código en 'data': {', '.join(missing)}", status_code=400) # [1]


        if not isinstance(data['target_language'], str) or not data['target_language'].strip():
             raise APIError("El campo 'target_language' es inválido o está vacío.", status_code=400) #chequeo de requerimientos minimos "lenguaje"

        if not isinstance(data['user_instructions'], str) or not data['user_instructions'].strip():
             raise APIError("El campo 'user_instructions' es inválido o está vacío.", status_code=400) # chequeo de requerimientos minimos "instrucciones"
             
        # Validación de campos opcionales para contexto/estilo (deben ser objetos) 
        if 'context_headers' in data and not isinstance(data['context_headers'], dict):
            raise APIError("El campo 'context_headers' debe ser un objeto JSON.", status_code=400) #chequeo de contenido de "headers" "constructor" "Metodos"

        if 'style_config' in data and not isinstance(data['style_config'], dict):
            raise APIError("El campo 'style_config' debe ser un objeto JSON.", status_code=400) #chequeo de seccion de especificaciones

        return data

    @classmethod
    def validate_request(cls, payload):
        if not isinstance(payload, dict):
            raise APIError("Payload inválido. Se espera un objeto JSON.", status_code=400)

        task_type = payload.get('task_type')
        data = payload.get('data')

        if not task_type or not data:
            raise APIError("Faltan campos obligatorios: 'task_type' o 'data'.", status_code=400)

        if task_type not in cls.SUPPORTED_TASK_TYPES:
            raise APIError(f"Tipo de tarea no soportado: {task_type}. Tipos permitidos: {', '.join(cls.SUPPORTED_TASK_TYPES)}", status_code=400)

        if task_type == "code_generation":
            cls.validate_code_generation_data(data)

        return payload