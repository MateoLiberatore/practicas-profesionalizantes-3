import os
from google import genai
from src.utils.error_handler import APIError

MODEL_NAME = "gemini-2.5-flash"

SYSTEM_INSTRUCTION_CODE_GENERATOR = (
    "You are an expert and efficient code generator."
    "Your only response must be the complete code block in the {language} language."
    "Do not add explanations, introductory text, or concluding text."
    "Comments in the code must be brief and atomic to document what is necessary"
)

def get_gemini_client():
    """
    Factory function that returns an instance of the Gemini client.
    It implements the Dependency Inversion Principle (DIP) by acting as an abstraction.
    """
    API_KEY = os.environ.get("GEMINI_API_KEY")

    if not API_KEY:
        raise APIError("The Gemini client is not configured (Missing API Key)", status_code=500)

    try:
        return genai.Client(api_key=API_KEY)
    
    except Exception as e:
        raise APIError(f"Error initializing the Gemini client: {e}", status_code=500)