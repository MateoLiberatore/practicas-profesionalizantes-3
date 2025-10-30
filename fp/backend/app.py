import os
from flask import Flask
from flask_cors import CORS

from src.routes.auth.auth_routes import auth_bp
from src.routes.llm.gemini_route import gemini_bp

from src.utils.error_handler import register_error_handlers
from src.configs.db import db_generation 
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') 


CORS(app, 
     resources={r"/*": {"origins": "http://localhost:5173"}}, 
     supports_credentials=True 
)

db_generation()

app.register_blueprint(auth_bp)
app.register_blueprint(gemini_bp, url_prefix='/api/v1') 

register_error_handlers(app)

@app.route('/')
def home():
     return "API está en funcionamiento."

if __name__ == '__main__':
    app.run(debug=True)