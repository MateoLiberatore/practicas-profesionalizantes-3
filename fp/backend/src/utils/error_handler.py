from flask import jsonify
from werkzeug.exceptions import HTTPException

class APIError(Exception):
    status_code = 500
    
    def __init__(self, message, status_code=None, payload=None, response_json=None):

        Exception.__init__(self)
        self.message = message
        
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload
        self.response_json = response_json 

    def to_dict(self):
        rv = dict(self.payload or ())
        
        # Mapeo de códigos de estado a tipos de error para uso programático
        error_type_mapping = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            409: 'CONFLICT',
            500: 'INTERNAL_SERVER_ERROR'
        }
        
        # Estructura de respuesta detallada
        rv['status'] = self.status_code
        rv['error_type'] = error_type_mapping.get(self.status_code, 'UNKNOWN_ERROR')
        rv['message'] = self.message
        
        # Opcional: añadir detalles de respuesta si están presentes
        if self.response_json:
            rv['details'] = self.response_json
            
        return rv

def handle_api_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

def handle_exceptions(error):

    if isinstance(error, HTTPException):
        response = jsonify({'error':error.description})
        response.status_code = error.code
        return response
    
    # Manejo de errores de código internos
    print(f"Error Interno No Capturado: {error}")
    response = jsonify({'error': 'Error interno del servidor. Consulte los logs.'})
    response.status_code = 500
    return response


def register_error_handlers(app):
    app.register_error_handler(APIError, handle_api_error)
    app.register_error_handler(Exception, handle_exceptions)