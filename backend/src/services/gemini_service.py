from google import genai
from src.configs.gemini_config import (
    get_gemini_client,
    MODEL_NAME,
    SYSTEM_INSTRUCTION_CODE_GENERATOR
)
from src.utils.error_handler import APIError
from src.models.gemini_model import GeminiRequestModel 

def _generate_code_prompt(data: dict) -> tuple[str, str]:

    language = data['target_language'] 
    user_instructions = data['user_instructions'] 
    
    context_headers = data.get('context_headers', {})
    style_config = data.get('style_config', {})

    system_instruction = SYSTEM_INSTRUCTION_CODE_GENERATOR.format(language=language)
    
    if context_headers:
        system_instruction += "\n\nSTRUCTURAL RESTRICTIONS:"
        for key, value in context_headers.items():
            system_instruction += f"\n- {key.upper()}: {value}"
            
    if style_config:
        system_instruction += "\n\nSTYLE CONFIGURATION:"
        for key, value in style_config.items():
            system_instruction += f"\n- Required Style ({key.upper()}): {value}"

    user_prompt = (
        f"Using the {language} language, generate the code that complies with the following instructions: \n\n"
        f"User instructions: {user_instructions}"
    )

    return system_instruction, user_prompt

def _clean_generated_code(raw_code: str) -> str:
    
    if raw_code.startswith('```'):
        lines = raw_code.strip().split('\n')
        if len(lines) > 1 and lines[0].strip().startswith('```'):
            lines = lines[1:]
        if lines[-1].strip() == '```':
            lines = lines[:-1]
        
        cleaned_code = '\n'.join(lines)
        return cleaned_code.strip()
    
    return raw_code.strip()


def _call_gemini_api(system_instruction: str, user_prompt: str):

    client = get_gemini_client() 
    
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=user_prompt,
        config=genai.types.GenerateContentConfig(
            system_instruction=system_instruction
        )
    )
    return response


def handle_code_generation(data: dict) -> dict:

    system_instruction, user_prompt = _generate_code_prompt(data)

    try:
        response = _call_gemini_api(system_instruction, user_prompt)
    except genai.errors.APIError as e:
        status_code = 500
        if hasattr(e, 'response_json') and e.response_json and 'error' in e.response_json and 'code' in e.response_json['error']:
            status_code = e.response_json['error']['code']
        raise APIError(f"Error in the Gemini API. Original message: {e}", status_code=status_code, response_json=None)
    except Exception as e:
        raise APIError(f"Unexpected error communicating with Gemini: {e}", status_code=500, response_json=None)
    
    raw_code = response.text

    if not raw_code.strip():
        raise APIError("Gemini could not generate code for the provided instructions.", status_code=500, response_json=None)

    clean_code = _clean_generated_code(raw_code)

    return {"code": clean_code}


def process_gemini_task(payload: dict):
    
    task_type = payload.get('task_type')
    data = payload.get('data')

    if task_type == 'code_generation':
        return handle_code_generation(data)

    raise APIError("Unsupported Gemini task type.", status_code=400, response_json=None)