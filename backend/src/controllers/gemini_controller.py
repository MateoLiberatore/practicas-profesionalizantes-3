from src.services.gemini_service import process_gemini_task
from src.utils.error_handler import APIError

class Gemini_Controller:
    """
    stateless
    """
    @staticmethod
    def handle_process_task(payload: dict):

        try:
            response = process_gemini_task(payload)
            return response
        except APIError as e: # AI errors 400 to 500
            raise e
        except Exception as e:
            # internal errors
            print(f"Internal error in Gemini_Controller: {e}")
            raise APIError("Internal server error while processing the AI task.", status_code=500) 

gemini_controller = Gemini_Controller()