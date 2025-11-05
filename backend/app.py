import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from src.routes.auth.auth_routes import auth_bp
from src.routes.llm.gemini_route import gemini_bp

from src.utils.error_handler import register_error_handlers
from src.configs.db import db_generation, generate_test_data

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') 

# Global CORS
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    expose_headers=["Authorization"],
)

db_generation()


app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
app.register_blueprint(gemini_bp, url_prefix="/api/v1/gemini")

register_error_handlers(app)

@app.route('/')
def home():
    return "API is running."

if __name__ == "__main__":
    app.run(debug=True)
