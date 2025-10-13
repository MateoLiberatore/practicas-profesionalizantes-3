import requests
import json
import os


BASE_URL = "http://127.0.0.1:5000/auth"

USER_DATA = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword"
}

def register_user(session, data):
    """Prueba el endpoint de registro de usuarios."""
    print("----------------------------------------")
    print("1. Probando registro de usuario...")
    try:
        response = session.post(f"{BASE_URL}/register", json=data)
        if response.status_code == 201:
            print("✅ Registro exitoso. Código de estado: 201.")
            return True
        elif response.status_code == 409:
            print("⚠️ Usuario ya existe. Código de estado: 409.")
            return True
        else:
            print(f"❌ Error en el registro. Código de estado: {response.status_code}, Respuesta: {response.text}")
            return False
    except requests.exceptions.ConnectionError as e:
        print(f"❌ No se pudo conectar a la API. Asegúrate de que el servidor Flask esté corriendo. Error: {e}")
        return False

def login_user(session, data):
    """Prueba el endpoint de inicio de sesión."""
    print("----------------------------------------")
    print("2. Probando inicio de sesión...")
    response = session.post(f"{BASE_URL}/login", json=data)

    if response.status_code == 200:
        print("✅ Login exitoso. Código de estado: 200.")
        return True
    else:
        print(f"❌ Error en el login. Código de estado: {response.status_code}, Respuesta: {response.text}")
        return False

def check_profile(session):
    """
    Prueba el endpoint protegido /profile y devuelve True si el acceso es exitoso,
    lo que significa que la sesión está activa.
    """
    print("----------------------------------------")
    print("3. Probando acceso a ruta protegida (/profile)...")
    response = session.get(f"{BASE_URL}/profile")
    
    if response.status_code == 200:
        print("✅ Acceso a /profile exitoso. Código de estado: 200.")
        return True
    else:
        print(f"❌ Acceso a /profile fallido. Código de estado: {response.status_code}, Respuesta: {response.text}")
        return False

def logout_user(session):
    """Prueba el endpoint de cierre de sesión."""
    print("----------------------------------------")
    print("4. Probando cierre de sesión...")
    response = session.post(f"{BASE_URL}/logout")

    if response.status_code == 200:
        print("✅ Cierre de sesión exitoso. Código de estado: 200.")
        return True
    else:
        print(f"❌ Error en el cierre de sesión. Código de estado: {response.status_code}, Respuesta: {response.text}")
        return False

def run_tests():
    """Ejecuta toda la secuencia de pruebas y verifica el estado de login."""
    # Usamos una sesión para que las cookies (Flask-Login) se guarden automáticamente.
    with requests.Session() as s:
        # Registro
        if not register_user(s, USER_DATA):
            return
        
        # Login
        if not login_user(s, USER_DATA):
            return
        
        # Verificación de login y retorno de 'true'
        is_logged_in = check_profile(s)
        
        print("----------------------------------------")
        print(f"¿Usuario logueado? -> {str(is_logged_in).lower()}")

        # Logout
        logout_user(s)

if __name__ == "__main__":
    run_tests()