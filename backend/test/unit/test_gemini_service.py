import pytest
from src.services.gemini_service import (
    _generate_code_prompt,
    _clean_generated_code,
    handle_code_generation
)
from src.utils.error_handler import APIError
from unittest.mock import Mock
from google import genai


def test_clean_generated_code_removes_markdown():
    raw_code = '```python\ndef test():\n    return 1\n```'
    expected = 'def test():\n    return 1'
    assert _clean_generated_code(raw_code) == expected


def test_generate_code_prompt_with_context():
    data = {
        'target_language': 'Java',
        'user_instructions': 'Implement the Singleton pattern.',
        'context_headers': {'class_name': 'DBConnector'},
        'style_config': {'naming': 'UpperCamelCase'}
    }
    system_instruction, _ = _generate_code_prompt(data)
    assert "STRUCTURAL RESTRICTIONS" in system_instruction
    assert "DBConnector" in system_instruction
    assert "UpperCamelCase" in system_instruction


def test_handle_code_generation_success(mock_gemini_api_call):
    data = {'target_language': 'Python', 'user_instructions': 'create a simple function'}
    result = handle_code_generation(data)
    assert result['code'] == 'def generated_function():\n    return True'
    mock_gemini_api_call.assert_called_once()


def test_handle_code_generation_api_failure(mocker):
    # The test simulates the Gemini API failure (code 500)
    mocker.patch(
        'src.services.gemini_service._call_gemini_api',
        side_effect=genai.errors.APIError(
            "Quota exceeded or internal server error.", 
            response_json={'error': {'message': 'Quota exceeded', 'code': 500}}
        )
    )
    data = {'target_language': 'Python', 'user_instructions': 'test'}
    
    # The test expects the function to catch the Gemini error and re-raise APIError
    with pytest.raises(APIError) as e:
        handle_code_generation(data)
        
    assert e.value.status_code == 500
    assert "Error in the Gemini API" in e.value.message


def test_handle_code_generation_empty_response(mocker):
    # Simulates an empty response from the model
    mock_response = Mock()
    mock_response.text = ' '
    mocker.patch('src.services.gemini_service._call_gemini_api', return_value=mock_response)

    data = {'target_language': 'Python', 'user_instructions': 'test'}
    with pytest.raises(APIError) as e:
        handle_code_generation(data)

    assert e.value.status_code == 500
    assert "Gemini could not generate code" in e.value.message