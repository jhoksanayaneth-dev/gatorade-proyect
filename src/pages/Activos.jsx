import "../estilos/baseDatos.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import useActivos from "../hooks/useActivos";
export default function Activos(){
    const [datos, error, cargando , setDatos] = useActivos();
    const navigate = useNavigate();
    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        nombreActivo: "",
        tipo: "",
        ubicacion: "",
        estado: "activo",

    })

    const nuevo = () => {
        setForm({id: null,
        nombreActivo: "",tipo: "",ubicacion: "", estado: "activo"});
        setMostrarForm(true);
    };


    const editar = (activos) => {
        setForm({ ...activos });
        setMostrarForm(true);
    };

    const guardar = async () => {
        if(!form.nombreActivo || !form.tipo || !form.ubicacion) return alert("completa los cambios")
        const url = form.id ? `http://localhost:5000/activos/${form.id}`:
         "http://localhost:5000/activos";
        const method = form.id ? 'PUT' : 'POST';
        const res = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        });
        if(!res.ok) return alert("error al guardar")
            else alert("activo guardado con exito");
        const nueva = await fetch("http://localhost:5000/activos") .then((r) => r.json());
        setDatos(nueva);
        setMostrarForm (false);
    };
    // Eliminar

    const borrar = async (id) => {
        if(!window.confirm("comfirmar eliminar este activo")) return;
        const res = await fetch(`http://localhost:5000/activos/${id}`,{
            method: "DELETE",
            
        })
        if (!res.ok) return alert ("error al eliminar");
        const nueva = await fetch ("http://localhost:5000/activos").then((r) => r.json());
        setDatos(nueva);

    };   



    if (error){
        return <h2>oh, ay un error</h2>
    }

    if (cargando){
        <h1>cargando</h1>

    }
    // fetch es la funcion nativa del navegador para hacerse peticiones http y traer o recibir datos de un servidor: que haces:
    // 1 debuelve un promise 2: por defecto hace un get pero puedes cambiar metodos, header, body etc. 3: la respuesta la tienes que convertir a formato json, text, blob
    // 4: se gestiona con .then .catch . await 
        
    const handleLogout = () => {
        navigate("/dassboar");
    };

    return(
    <>
        
       <div className="activos-contenido">  
        <div style={{padding: '10px', textAlign: 'right'}}>
            <button className="boton-regreso" onClick={handleLogout}><a href="#"></a>Regresar </button>
        </div>
        <button className="boton-regreso" onClick={nuevo}>
            Nuevo Activo
        </button>
        {mostrarForm && (
            <div className="card mb-3">
                <div className="card-body"> 
                    <h5>crear activo</h5>
                    <input className="form-control mb-2" placeholder="nombre" value={form.nombreActivo} onChange={(e) => setForm({...form, nombreActivo: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="tipo" value={form.tipo} onChange={(e) => setForm({...form, tipo: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="ubicacion" value={form.ubicacion} onChange={(e) => setForm({...form, ubicacion: e.target.value})}/>
                    <select className="from-select mb-2"
                    value={form.estado}
                    onChange={(e) => setForm({...form, estado: e.target.value})}>
                        <option >Activo</option>
                        <option >Inactivo</option>
                    </select>
                    <button className="editar" onClick={guardar}>Guardar</button>

                    <button className="eliminar" onClick={() => setMostrarForm(false)}>Cancelar</button>
                </div>
                
            </div>
        )}

        <div className="table">
        <table className="table table-striped">
            <thead> 
            <tr>    
                <th scope="col">ID</th>
                <th scope="col">Nombre del activo</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ubicacion</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
            </tr>
            </thead>
            <tbody>
            {
                datos.map(activos => (
                <tr key={activos.id}> 
                <td>{activos.id}</td>
                <td>{activos.nombreActivo}</td>
                <td>{activos.tipo}</td>
                <td>{activos.ubicacion} </td>
                <td>{activos.estado}</td>
                <td><button className="editar" onClick={() => editar(activos)}>Editar</button>
                <button className="eliminar" onClick={() => borrar(activos.id)}>Eliminar</button></td>
                </tr>
                )
                )
            }

                </tbody>
            </table>
        </div>
    </div>
    </>
 
        )
}