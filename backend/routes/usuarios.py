import hashlib
import secrets
import datetime
from flask import Blueprint, jsonify, request
import jwt
from db import get_connection

usuarios_bp = Blueprint('usuarios', __name__, url_prefix='/api')
SECRET = "mafis-secret"

def hash_password(password: str) -> str:
    salt = "mafis-salt"
    return hashlib.sha256((password + salt).encode()).hexdigest()

#----------listado usuarios ---------
@usuarios_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM usuarios")
        rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

#---------editar ---------------
@usuarios_bp.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    try:
        data = request.get_json()
        print(data)

        conn = get_connection()

        with conn.cursor() as cursor:
            sql_base = "UPDATE usuarios SET nombre=%s, email=%s, rol=%s"
            params = [data['nombre'], data['email'], data['rol']]

            if data.get('password'):
                params.append(hash_password(data['password']))
                sql_base += ", password=%s"

            sql = sql_base + " WHERE usuario_id=%s"
            params.append(usuario_id)

            filas = cursor.execute(sql, params)
            conn.commit()

        conn.close()

        if filas == 0:
            return jsonify({'error': 'Not found'}), 404

        return jsonify({'msg': 'Actualizado'})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({'error': str(e)}), 500

# ------------ eliminar ---------------
@usuarios_bp.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def borrar_usuario(usuario_id):
    conn = get_connection()
    with conn.cursor() as cursor:
        filas = cursor.execute("DELETE FROM usuarios WHERE usuario_id=%s", (usuario_id,))
        conn.commit()
    conn.close()
    if filas == 0:
        return jsonify({'error': 'No encontrado'}), 404
    return jsonify({'msg': 'borrado'})

# ---------- REGISTRO ----------
@usuarios_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    password = data.get('password')
    rol = data.get('rol')
    if not nombre or not email or not password:
        return jsonify({'error': 'Faltan campos'}), 400
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT usuario_id FROM usuarios WHERE email=%s", (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Email ya registrado'}), 409
        pwd_hash = hash_password(password)
        sql = "INSERT INTO usuarios (nombre, email, password, rol) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (nombre, email, pwd_hash, rol))
        conn.commit()
    conn.close()
    return jsonify({'msg': 'Usuario creado'}), 201

# ---------- LOGIN ----------
@usuarios_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT usuario_id, nombre, email, rol, password FROM usuarios WHERE email=%s", (email,))
        user = cursor.fetchone()
    conn.close()
    if not user or user['password'] != hash_password(password):
        return jsonify({'error': 'Credenciales inválidas'}), 401
    token = jwt.encode({'usuario_id': user['usuario_id'],'nombre': user['nombre'], 'email': user['email'], 'rol': user['rol'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET, algorithm="HS256")
    return jsonify({'token': token, 'user': {'usuario_id': user['usuario_id'], 'nombre': user['nombre'], 'email': user['email'], 'rol': user['rol']}})

# ---------- RUTA PROTEGIDA ----------
def token_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token faltante'}), 401
        try:
            data = jwt.decode(token, SECRET, algorithms=["HS256"])
            request.user = data
        except Exception:
            return jsonify({'error': 'Token inválido o expirado'}), 401
        return f(*args, **kwargs)
    return decorated




# ---------- DASHBOARD ----------
@usuarios_bp.route('/Dassboar')
@token_required
def dashboard():
    return jsonify({'msg': f"Bienvenido {request.user['nombre']}", 'rol': request.user['rol']})

@usuarios_bp.route('/Dassboar', methods=['OPTIONS'])
def options_dashboard():
    return '', 200