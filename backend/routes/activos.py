from flask import Blueprint, jsonify, request
from db import get_connection

activos_bp = Blueprint('activos', __name__)


@activos_bp.route('/activos', methods=['GET'])
def get_activos():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM activos")
        rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)


@activos_bp.route('/activos', methods=['POST'])
def crear_activos():
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "INSERT INTO activos (nombreActivo,tipo, ubicacion, estado) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (data['nombreActivo'], data['tipo'], data['ubicacion'], data['estado']))
        conn.commit()
    conn.close()
    return jsonify({'msg': 'creado'}), 201


@activos_bp.route('/activos/<int:id>', methods=['PUT'])
def actualizar_activo(id):
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "UPDATE activos SET nombreActivo=%s, tipo=%s, ubicacion=%s, estado=%s WHERE id=%s"
        filas = cursor.execute(sql, (data['nombreActivo'], data['tipo'], data['ubicacion'], data['estado'], id))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'error': 'No encontrado'}), 404
    return jsonify({'msg': 'actualizado'})


@activos_bp.route('/activos/<int:id>', methods=['DELETE'])
def borrar_activo(id):
    conn = get_connection()
    with conn.cursor() as cursor:
        filas = cursor.execute("DELETE FROM activos WHERE id=%s", (id,))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'Error': 'No encontrado'}), 404
    return jsonify({'msg': 'borrado'})
