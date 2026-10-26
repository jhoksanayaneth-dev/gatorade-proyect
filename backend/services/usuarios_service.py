# services/usuarios_service.py

from db import get_connection
from utils.security import hash_password

def create_usuario_service(data):
    conn = get_connection()

    with conn.cursor() as cursor:
        cursor.execute(
            "SELECT usuario_id FROM usuarios WHERE email=%s",
            (data['email'],)
        )
        existe = cursor.fetchone()
        
        if existe:
            conn.close()
            return {
                "error": "Email ya registrado"
            }, 409
        pwd_hash = hash_password(
            data['password']
        )
        
        sql = """
        INSERT INTO usuarios
        (
            nombre,
            email,
            password,
            rol
        )
        VALUES (%s,%s,%s,%s)
        """

        cursor.execute(
            sql,
            (
                data['nombre'],
                data['email'],
                pwd_hash,
                data['rol']
            )
        )
        conn.commit()
    conn.close()
    return {
        "msg": "Usuario creado"
    }, 201

def read_usuarios_service():
    conn = get_connection()

    with conn.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM usuarios"
        )
        usuarios = cursor.fetchall()
    conn.close()
    return usuarios

def update_usuario_service(usuario_id, data):
    conn = get_connection()

    with conn.cursor() as cursor:
        sql = """
        UPDATE usuarios
        SET nombre=%s,
            email=%s,
            rol=%s
        """
        params = [
            data['nombre'],
            data['email'],
            data['rol']
        ]
        
        # Si envían contraseña, actualizarla
        if data.get('password'):
            sql += ", password=%s"
            params.append(
                hash_password(data['password'])
            )
        sql += " WHERE usuario_id=%s"
        params.append(usuario_id)
        filas = cursor.execute(sql, params)
        conn.commit()
    conn.close()

    if filas == 0:
        return {
            "error": "Usuario no encontrado"
        }, 404
    return {
        "msg": "Usuario actualizado correctamente"
    }, 200
    
def delete_usuario_service(usuario_id):
    conn = get_connection()
    
    with conn.cursor() as cursor:
        filas = cursor.execute(
            "DELETE FROM usuarios WHERE usuario_id=%s",
            (usuario_id,)
        )
        conn.commit()
    conn.close()

    if filas == 0:
        return {
            "error": "Usuario no encontrado"
        }, 404

    return {
        "msg": "Usuario eliminado correctamente"
    }, 200
    
    