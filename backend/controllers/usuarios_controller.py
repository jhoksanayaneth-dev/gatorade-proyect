# controllers/usuarios_controller.py
from flask import jsonify, request

from services.usuarios_service import (
    create_usuario_service,
    read_usuarios_service,
    update_usuario_service,
    delete_usuario_service
)

def read_usuarios():
    usuarios = read_usuarios_service()
    return jsonify(usuarios)

def create_usuario():
    data = request.get_json()
    respuesta, codigo = create_usuario_service(data)
    return jsonify(respuesta), codigo

def update_usuario(usuario_id):
    data = request.get_json()
    respuesta, codigo = update_usuario_service(
        usuario_id,
        data
    )
    return jsonify(respuesta), codigo

def delete_usuario(usuario_id):
    respuesta, codigo = delete_usuario_service(usuario_id)
    return jsonify(respuesta), codigo

