import os
from google import genai
from src.utils.error_handler import APIError

MODEL_NAME = "gemini-2.5-flash"

# Instrucción del sistema centralizada
SYSTEM_INSTRUCTION_CODE_GENERATOR = (
    "Eres un generador de código experto y eficiente. Tu única respuesta debe ser el bloque de código "
    "completo en el lenguaje {language}. No añadas explicaciones, texto introductorio, ni texto de conclusión."
    "Los comentarios en el codigo deben ser breves y atómicos para documentar lo necesario"
)

def get_gemini_client():
    """
    Función Factory que retorna una instancia del cliente de Gemini.
    Implementa el Principio de Inversión de Dependencias (DIP) al actuar como una abstracción.
    """
    API_KEY = os.environ.get("GEMINI_API_KEY")

    if not API_KEY:
        raise APIError("El cliente de Gemini no está configurado (API Key faltante).", status_code=500)

    try:
        return genai.Client(api_key=API_KEY)
    
    except Exception as e:
        raise APIError(f"Error al inicializar el cliente de Gemini: {e}", status_code=500)