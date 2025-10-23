from src.utils.error_handler import APIError

class GeminiRequestModel:
    SUPPORTED_TASK_TYPES = ["code_generation"]

    @staticmethod
    def validate_code_generation_data(data):
        required_fields = ['language', 'template']
        missing = [f for f in required_fields if f not in data]
        
        if missing:
            raise APIError(f"Faltan campos obligatorios para generación de código en 'data': {', '.join(missing)}", status_code=400)
        
        if not isinstance(data['language'], str) or not data['language'].strip():
             raise APIError("El campo 'language' es inválido o está vacío.", status_code=400)
        
        if not isinstance(data['template'], str) or not data['template'].strip():
             raise APIError("El campo 'template' es inválido o está vacío.", status_code=400)
        
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
            return cls.validate_code_generation_data(data)
        
        return data