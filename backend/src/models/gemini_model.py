from src.utils.error_handler import APIError

class GeminiRequestModel:
    
    # Support to add more tasks in the future, e.g.: "error_fixing"
    SUPPORTED_TASK_TYPES = ["code_generation"] 

    @staticmethod
    def validate_code_generation_data(data):
        required_fields = ['target_language', 'user_instructions']
        missing = [f for f in required_fields if f not in data]

        if missing:
            # Missing mandatory fields for code generation in 'data': {', '.join(missing)}
            raise APIError(f"Missing mandatory fields for code generation in 'data': {', '.join(missing)}", status_code=400) 

        # Minimum requirement check "language"
        if not isinstance(data['target_language'], str) or not data['target_language'].strip():
             raise APIError("The field 'target_language' is invalid or empty.", status_code=400) 
        
        # Minimum requirement check "instructions"
        if not isinstance(data['user_instructions'], str) or not data['user_instructions'].strip():
             raise APIError("The field 'user_instructions' is invalid or empty.", status_code=400) 
             
        # Check content of "headers" "constructor" "Methods"
        if 'context_headers' in data and not isinstance(data['context_headers'], dict):
            raise APIError("The field 'context_headers' must be a JSON object.", status_code=400) 
        
        # Check specifications section
        if 'style_config' in data and not isinstance(data['style_config'], dict):
            raise APIError("The field 'style_config' must be a JSON object.", status_code=400) 

        return data

    @classmethod
    def validate_request(cls, payload):
        
        if not isinstance(payload, dict):
            raise APIError("Invalid payload. A JSON object is expected.", status_code=400)

        task_type = payload.get('task_type')
        data = payload.get('data')

        if not task_type or not data:
            raise APIError("Missing mandatory fields: 'task_type' or 'data'.", status_code=400)

        if task_type not in cls.SUPPORTED_TASK_TYPES:
            raise APIError(f"Unsupported task type: {task_type}. Allowed types: {', '.join(cls.SUPPORTED_TASK_TYPES)}", status_code=400)

        if task_type == "code_generation":
            cls.validate_code_generation_data(data)

        return payload