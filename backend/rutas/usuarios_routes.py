from flask import Blueprint

from controllers.usuarios_controller import (
    read_usuarios,
    create_usuario,
    update_usuario,
    delete_usuario
)

usuarios_bp = Blueprint(
    'usuarios',
    __name__,
    url_prefix='/api'
)

usuarios_bp.route(
    '/usuarios',
    methods=['GET']
)(
    read_usuarios
)

usuarios_bp.route(
    '/usuarios',
    methods=['POST']
)(
    create_usuario
)

usuarios_bp.route(
    '/usuarios/<int:usuario_id>',
    methods=['PUT']
)(
    update_usuario
)

usuarios_bp.route(
    '/usuarios/<int:usuario_id>',
    methods=['DELETE']
)(
    delete_usuario
)