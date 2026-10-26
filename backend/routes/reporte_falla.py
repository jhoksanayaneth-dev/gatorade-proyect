from flask import Blueprint, jsonify, request
from db import get_connection

reporte_falla_bp = Blueprint('reporte_falla', __name__)


@reporte_falla_bp.route('/reporte_falla', methods=['GET'])
def get_reporte_falla():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM reporte_falla")
        rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

@reporte_falla_bp.route('/reporte_falla', methods=['POST'])
def crear_reporte_falla():
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "INSERT INTO reporte_falla (activo, descripcion, prioridad, estado, fecha) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (data['activo'], data['descripcion'], data['prioridad'], data['estado'], data['fecha']))
        conn.commit()
    conn.close()
    return jsonify({'msg': 'creado'}), 201

@reporte_falla_bp.route('/reporte_falla/<int:falla_id>', methods=['PUT'])
def actualizar_reporte_falla(falla_id):
    data = request.get_json()
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "UPDATE reporte_falla SET activo=%s, descripcion=%s, prioridad=%s, estado=%s, fecha=%s WHERE falla_id=%s"
        filas = cursor.execute(sql, (data['activo'], data['descripcion'], data['prioridad'], data['estado'], data['fecha'], falla_id))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'error': 'No encontrado'}), 404
    return jsonify({'msg': 'actualizado'})

@reporte_falla_bp.route('/reporte_falla/<int:falla_id>', methods=['DELETE'])
def borrar_reporte_falla(falla_id):
    conn = get_connection()
    with conn.cursor() as cursor:
        filas = cursor.execute("DELETE FROM reporte_falla WHERE falla_id=%s", (falla_id,))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'Error': 'No encontrado'}), 404
    return jsonify({'msg': 'borrado'})
