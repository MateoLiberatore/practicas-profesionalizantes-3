import os
from dotenv import load_dotenv
from google import genai
from src.configs.gemini_config import get_gemini_client
from src.utils.error_handler import APIError

load_dotenv() 

TEST_MODE = os.environ.get("GEMINI_TEST_MODE", "False").lower() == 'true'

class MockResponse:
    def __init__(self, text):
        self.text = text

def mock_generate_content(*args, **kwargs):
    user_prompt = kwargs.get('contents')
    if isinstance(user_prompt, list):
        user_prompt = user_prompt[0]

    mock_code = (
        f"# Código simulado en modo de prueba\n"
        f"def simulated_function():\n"
        f"    # El prompt fue: {user_prompt[:50]}...\n"
        f"    return 'Hello, Gemini Test World!'"
    )
    return MockResponse(mock_code)

class MockClient:
    def __init__(self):
        self.models = self

    def generate_content(self, *args, **kwargs):
        return mock_generate_content(*args, **kwargs)

def get_mock_client():
    return MockClient()


class GeminiService:
    def __init__(self):
        if TEST_MODE:
            self.client = get_mock_client()
        else:
            self.client = get_gemini_client()

        self.model_name = "gemini-2.5-flash" 

    def _generate_code_prompt(self, data):
        language = data['language']
        template_instructions = data['template']
        
        system_instruction = (
            f"Eres un generador de código experto y eficiente. Tu única respuesta debe ser el bloque de código "
            f"completo en el lenguaje {language}. No añadas explicaciones, texto introductorio, ni texto de conclusión."
        )

        user_prompt = (
            f"Usando el lenguaje {language}, genera el código que cumple con las siguientes instrucciones: "
            f"\n\nInstrucciones del usuario: {template_instructions}"
        )

        return system_instruction, user_prompt

    def _clean_generated_code(self, raw_code):
        lines = raw_code.strip().splitlines()
        
        if lines and lines[0].strip().startswith("```"):
            lines = lines[1:]
        
        if lines and lines[-1].strip() == "```":
            lines.pop()
            
        return "\n".join(lines).strip()

    def _handle_code_generation(self, data):
        system_instruction, user_prompt = self._generate_code_prompt(data)
        
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=user_prompt,
                config=genai.types.GenerateContentConfig(
                    system_instruction=system_instruction
                )
            )
            
            raw_code = response.text
            
            if not raw_code.strip():
                raise APIError("Gemini no pudo generar código para las instrucciones proporcionadas.", status_code=500)
            
            clean_code = self._clean_generated_code(raw_code)
                
            return {"code": clean_code}
            
        except genai.errors.APIError as e:
            print(f"Error de la API de Gemini: {e}")
            raise APIError("Error en el servicio de IA. Verifica tu API Key o los límites de uso.", status_code=500)
            
        except Exception as e:
            print(f"Error inesperado durante la generación de código: {e}")
            raise APIError("Ocurrió un error inesperado al procesar la solicitud de IA.", status_code=500)


    def process_task(self, task_type, data):
        
        if task_type == "code_generation":
            return self._handle_code_generation(data)
        
        raise APIError(f"Tarea {task_type} no implementada en el servicio.", status_code=500)