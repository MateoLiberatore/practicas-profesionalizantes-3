from src.services.gemini_service import GeminiService
from src.models.gemini_model import GeminiRequestModel
from src.utils.error_handler import APIError

class GeminiController:
    
    def __init__(self):
        self.service = GeminiService()

    def handle_process_task(self, payload):
        
        GeminiRequestModel.validate_request(payload) 
        
        task_type = payload['task_type']
        data = payload['data']
        
        response = self.service.process_task(task_type, data)
        
        return response

gemini_controller = GeminiController()