from flask import Blueprint, jsonify, request
from db import get_connection

orden_trabajo_bp = Blueprint('orden_trabajo', __name__)



@orden_trabajo_bp.route('/orden_trabajo', methods=['GET'])
def get_orden_trabajo():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM orden_trabajo")
        rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)


@orden_trabajo_bp.route('/orden_trabajo', methods=['POST'])
def crear_orden_trabajo():
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "INSERT INTO orden_trabajo (reporte,activo, tecnico, descripcion, estado, fecha) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (data['reporte'], data['activo'], data['tecnico'], data['descripcion'], data['estado'], data['fecha']))
        conn.commit()
    conn.close()
    return jsonify({'msg': 'creado'}), 201

@orden_trabajo_bp.route('/orden_trabajo/<int:orden_id>', methods=['PUT'])
def actualizar_orden_trabajo(orden_id):
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "UPDATE orden_trabajo SET reporte=%s, activo=%s, tecnico=%s, descripcion=%s, estado=%s, fecha=%s WHERE orden_id=%s"
        filas = cursor.execute(sql, (data['reporte'], data['activo'], data['tecnico'], data['descripcion'], data['estado'], data['fecha'], orden_id))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'error': 'No encontrado'}), 404
    return jsonify({'msg': 'actualizado'})

@orden_trabajo_bp.route('/orden_trabajo/<int:orden_id>', methods=['DELETE'])
def borrar_orden_trabajo(orden_id):
    conn = get_connection()
    with conn.cursor() as cursor:
        filas = cursor.execute("DELETE FROM orden_trabajo WHERE orden_id=%s", (orden_id,))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'Error': 'No encontrado'}), 404
    return jsonify({'msg': 'borrado'})

