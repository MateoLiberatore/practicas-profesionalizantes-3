import os
from google import genai
from src.utils.error_handler import APIError

def get_gemini_client():
    API_KEY = os.environ.get("GEMINI_API_KEY")
    
    if not API_KEY:
        raise APIError("El cliente de Gemini no está configurado (API Key faltante). No se puede ejecutar en modo real.", status_code=500)
    
    try:
        return genai.Client(api_key=API_KEY)
    except Exception as e:
        raise APIError(f"Error al inicializar el cliente de Gemini con la clave proporcionada: {e}", status_code=500)