import React, { useState, useEffect } from 'react';
import "../estilos/administracion.css"
import { useNavigate } from 'react-router-dom';
import UseAdmistrador from '../hooks/UseAdmistrador';
export default function Administracion() {
    const navigate = useNavigate();
    const [datos, error, cargando, setDatos] = UseAdmistrador();
    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        rol: "",
        fecha_registro: "",
        password: "",
    });

      const nuevo = () => {
        setForm({
            nombre: "",
            email: "",
            rol: "",
            fecha_registro: "",
            password: "",
        });
        setMostrarForm(true);
      };

      const guardar = async(e) => {
        e.preventDefault();
        try{
            if (!form.nombre || !form.email || !form.rol || !form.fecha_registro || !form.password ) return alert("completa los campos");
            const url = form.usuario_id ? `http://localhost:5000/api/usuarios/${form.usuario_id}` : `http://localhost:5000/api/register`;
            const method = form.usuario_id ? 'PUT' : 'POST';
            const res = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
          })
            const data = await res.json();
            if(!res.ok) {
              alert(data.error || "Error en el registro");
              return console.error("Error en el registro:", data.error || "Error desconocido");
            }
            const nueva = await fetch("http://localhost:5000/api/usuarios") .then((r) => r.json());
            setDatos(nueva);
            alert(form.usuario_id 
                ? "Usuario actualizado exitosamente"
                : "Usuario creado exitosamente"
             );
            setMostrarForm(false);
    
        } catch(error){
            alert("Error en el registro");
            console.error(error);
        }
    
    }

    const editar = (Administracion) => {
        setForm({ ...Administracion });
        setMostrarForm(true);
    }

      const eliminar = async (usuario_id) => {
        if(!window.confirm("confirmar eliminar este usuario")) return;
        const res = await fetch(`http://localhost:5000/api/usuarios/${usuario_id}`, {
            method: 'DELETE',
        });
        if(!res.ok) return alert("error al eliminar");
        const nueva = await fetch("http://localhost:5000/api/usuarios") .then((r) => r.json());
        setDatos(nueva);
    };
    const handleLogout = () => {
        navigate("/dassboar");
        };
    

  return (
    <div className="administracion-contenido">  
    <div style={{padding: '10px', textAlign: 'right'}}>
        <button className="boton-regreso" onClick={handleLogout}><a href="#"></a>Regresar </button>
    </div>
    <button className="boton-regreso" onClick={nuevo}>
        Nuevo Usuario
    </button>
    {mostrarForm && (
        <div className="card mb-3">
            <div className="card-body"> 
                <h5>Crear Usuario</h5>
                <input className="form-control mb-2" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})}/>
                <input className="form-control mb-2" type='email' placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                <select className="from-select mb-2"
                    value={form.rol}
                    onChange={(e) => setForm({...form, rol: e.target.value})}>
                        <option >rol</option>
                        <option >Administrador</option>
                        <option >solicitante</option>
                        <option >tecnico</option>
                    </select>
                <input className="form-control mb-2" type='date' placeholder="Fecha registro" value={form.fecha_registro} onChange={(e) => setForm({...form, fecha_registro: e.target.value})}/>
                <input className="form-control mb-2" type='password' placeholder="contraseña" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
                <button className="editar" onClick={guardar}>Guardar</button>

                <button className="eliminar" onClick={() => setMostrarForm(false)}>Cancelar</button>
            </div>
            
        </div>  
    )}
<div className='table'>
    <table className="table table-striped">
        <thead> 
        <tr>    
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">fecha registro</th>
            <th scope="col">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {
            datos.map(Administracion => (
            <tr key={Administracion.id}> 
            <td>{Administracion.usuario_id}</td>
            <td>{Administracion.nombre}</td>
            <td>{Administracion.email}</td>
            <td>{Administracion.rol} </td>
            <td>{Administracion.fecha_registro}</td>
            <td><button className="editar"  onClick={() => editar(Administracion)}>Editar</button>
            <button className="eliminar" onClick={() => eliminar(Administracion.usuario_id)}>Eliminar</button></td>
            </tr>
            )
            )
        }

            </tbody>
        </table>
    </div>
    </div>
  )
}