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
        except APIError as e: # errores 400 a 500 de IA
            raise e
        except Exception as e:
            # errores internos
            print(f"Error interno en GeminiController: {e}")
            raise APIError("Error interno del servidor al procesar la tarea de IA.", status_code=500) # 

gemini_controller = Gemini_Controller()