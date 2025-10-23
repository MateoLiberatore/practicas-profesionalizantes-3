import os
from src.services.gemini_service import GeminiService
from src.utils.error_handler import APIError

def run_test():
    
    print("--- Prueba Local del GeminiService (Modo síncrono) ---")
    
    is_test_mode = os.environ.get("GEMINI_TEST_MODE", "False").lower() == 'true'
    has_api_key = os.environ.get("GEMINI_API_KEY")
    
    if is_test_mode:
        print("MODO: TEST (Simulación)")
    elif not has_api_key:
        print("MODO: REAL")
        print("ADVERTENCIA: La clave GEMINI_API_KEY no se encontró en el entorno. La prueba en modo real fallará.")
    else:
        print("MODO: REAL (Conexión a la API)")

    test_data = {
        'language': 'Javascript',
        'template': 'Crea una función asíncrona que use fetch para obtener datos de una API y devuelva un array vacío si falla.'
    }
    test_task_type = 'code_generation'
    
    try:
        service = GeminiService()
        
        # Se asume que _generate_code_prompt es un método disponible en el servicio para obtener el prompt
        system_p, user_p = service._generate_code_prompt(test_data) 
        
        print("\n[DEBUG] SYSTEM PROMPT generado:")
        print(system_p)
        print("\n[DEBUG] USER PROMPT generado:")
        print(user_p)
        
        print("\n[DEBUG] Procesando tarea...")
        result = service.process_task(test_task_type, test_data)
        
        print("\n--- RESULTADO DE LA LLAMADA AL SERVICIO ---\n")
        print(result)
        
    except APIError as e:
        print(f"\n[ERROR DE API] Código: {e.status_code}, Mensaje: {e.message}")
    except Exception as e:
        print(f"\n[ERROR GENERAL] {e}")

    print("\n--- Fin de la prueba local ---")

if __name__ == '__main__':
    run_test()