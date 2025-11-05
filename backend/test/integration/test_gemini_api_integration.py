import os
import pytest
from google import genai
from src.configs.gemini_config import get_gemini_client
from src.services.gemini_service import handle_code_generation, process_gemini_task
from src.utils.error_handler import APIError

pytestmark = pytest.mark.integration

@pytest.fixture(scope="session")
def gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        pytest.skip("GEMINI_API_KEY not configured, skipping real test.")
    return get_gemini_client()


def test_gemini_client_initialization(gemini_client):
    assert isinstance(gemini_client, genai.Client)


def test_handle_code_generation_real_call(gemini_client):
    data = {
        "target_language": "Python",
        "user_instructions": "create a function that adds two numbers and returns the result"
    }
    response = handle_code_generation(data)
    assert "code" in response
    assert isinstance(response["code"], str)
    assert len(response["code"].strip()) > 0
    assert "def" in response["code"] or "function" in response["code"]


def test_process_gemini_task_full_flow(gemini_client):
    payload = {
        "task_type": "code_generation",
        "data": {
            "target_language": "Python",
            "user_instructions": "generate a class that represents a rectangle with methods to calculate area and perimeter"
        }
    }
    response = process_gemini_task(payload)
    assert isinstance(response, dict)
    assert "code" in response
    assert "class" in response["code"]
    assert "area" in response["code"] or "perimeter" in response["code"]


def test_handle_code_generation_with_invalid_key(monkeypatch):
    monkeypatch.setenv("GEMINI_API_KEY", "INVALID_KEY")

    data = {
        "target_language": "Python",
        "user_instructions": "test error"
    }

    with pytest.raises(APIError) as e:
        handle_code_generation(data)

    assert e.value.status_code == 500
    assert "Error in the Gemini API" in e.value.message