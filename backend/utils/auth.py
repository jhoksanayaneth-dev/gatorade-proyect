# utils/auth.py

import jwt
import datetime

from flask import request, jsonify
from functools import wraps

SECRET = "mafis-secret"

def generar_token(usuario):

    token = jwt.encode(
        {
            'usuario_id': usuario['usuario_id'],
            'nombre': usuario['nombre'],
            'email': usuario['email'],
            'rol': usuario['rol'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        SECRET,
        algorithm="HS256"
    )

    return token


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get('Authorization')

        if not token:
            return jsonify({
                'error': 'Token faltante'
            }), 401

        try:

            data = jwt.decode(
                token,
                SECRET,
                algorithms=["HS256"]
            )

            request.user = data

        except Exception:

            return jsonify({
                'error': 'Token inválido'
            }), 401

        return f(*args, **kwargs)

    return decorated