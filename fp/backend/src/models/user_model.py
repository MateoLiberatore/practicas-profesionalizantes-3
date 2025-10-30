import sqlite3
from src.utils.error_handler import APIError

class UserModel:
    
    def __init__(self, db_file="users.db"):
        self.db_file = db_file

    def connect(self):
        try:
            conn = sqlite3.connect(self.db_file)
            conn.row_factory = sqlite3.Row
            return conn
        except sqlite3.Error as e:
            raise APIError(f"Error al conectar a la base de datos: {e}", status_code=500, response_json=None)

    def create_user(self, username, email, password):
        conn = self.connect()
        try:
            with conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    INSERT INTO users (username, email, password) VALUES (?,?,?)
                    """,
                    (username, email, password)
                )
                user_id = cursor.lastrowid
                return {
                    "id": user_id,
                    "username": username,
                    "email": email
                }
        except sqlite3.IntegrityError:
            raise APIError("El nombre de usuario o email ya existe.", status_code=409, response_json=None)
        except sqlite3.Error as e:
            raise APIError(f"Ocurrió un error al crear el usuario: {e}", status_code=500, response_json=None)
        finally:
            conn.close()

    def get_user_by_name(self, username):
        conn = self.connect()
        try:
            with conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM users WHERE username =?", (username,))
                user_data = cursor.fetchone()
                return dict(user_data) if user_data else None
        finally:
            conn.close()
    
    def get_user_by_email(self, email):
        conn = self.connect()
        try:
            with conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM users WHERE email =?", (email,))
                user_data = cursor.fetchone()
                return dict(user_data) if user_data else None
        finally:
            conn.close()

    def get_user_by_id(self, user_id):
        conn = self.connect()
        try:
            with conn:
                cursor = conn.execute("SELECT * FROM users WHERE id =?", (user_id,))
                user_data = cursor.fetchone()
                return dict(user_data) if user_data else None 
        finally:
            conn.close()