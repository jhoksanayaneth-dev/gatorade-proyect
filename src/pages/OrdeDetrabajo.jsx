import "../estilos/OrdenTrabajo.css"
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import useOrden from "../hooks/UseOrden";
export default function OrdeDetrabajo(){
        const [datos, error, cargando, setDatos] = useOrden();
        const navigate = useNavigate();
        const [mostrarForm, setMostrarForm] = useState(false);
        const [form, setForm] = useState({
            orden_id: null,
            reporte: "",
            activo: "",
            tecnico: "",
            descripcion: "",
            estado: "",
            fecha: "",
    
        });
        const nuevo = () => {
        setForm({id: null,
        reporte: "",activo: "",tecnico: "", descripcion: "", estado: "", fecha: "", acciones: ""});
        setMostrarForm(true);
        };
        const handleLogout = () => {
        navigate("/dassboar");
        };

        const editar = (orden_trabajo) => {
            setForm({ ...orden_trabajo });
            setMostrarForm(true);
        }

        const guardar = async () => {
            if (!form.reporte || !form.activo || !form.tecnico || !form.descripcion || !form.estado || !form.fecha) return alert("completa los campos");
            const url = form.orden_id ? `http://localhost:5000/orden_trabajo/${form.orden_id}` : `http://localhost:5000/orden_trabajo`;
            const method = form.orden_id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });
            if(!res.ok) return alert("error al guardar");
            const nueva = await fetch("http://localhost:5000/orden_trabajo") .then((r) => r.json());
            setDatos(nueva);
            setMostrarForm (false);
        };

        const eliminar = async (orden_id) => {
            if(!window.confirm("confirmar eliminar esta orden de trabajo")) return;
            const res = await fetch(`http://localhost:5000/orden_trabajo/${orden_id}`, {
                method: 'DELETE',
            });
            if(!res.ok) return alert("error al eliminar");
            const nueva = await fetch("http://localhost:5000/orden_trabajo") .then((r) => r.json());
            setDatos(nueva);
        };

    return(
           <div className="orden-contenido">  
        <div style={{padding: '10px', textAlign: 'right'}}>
            <button className="boton-regreso" onClick={handleLogout}><a href="#"></a>Regresar </button>
        </div>
        <button className="boton-regreso" onClick={nuevo}>
            Nueva Orden de Trabajo
        </button>
        {mostrarForm && (
            <div className="card mb-3">
                <div className="card-body"> 
                    <h5>crear orden de trabajo</h5>
                    <input className="form-control mb-2" placeholder="Reporte" value={form.reporte} onChange={(e) => setForm({...form, reporte: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Activo" value={form.activo} onChange={(e) => setForm({...form, activo: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Tecnico" value={form.tecnico} onChange={(e) => setForm({...form, tecnico: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Descripcion" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})}/>
                    <select className="from-select mb-2"
                    value={form.estado}
                    onChange={(e) => setForm({...form, estado: e.target.value})}>
                        <option >Estado</option>
                        <option >Urgente</option>
                        <option >Programadas</option>
                        <option >Retrasadas</option>
                    </select>
                    <input className="form-control mb-2" placeholder="Fecha" type="date" value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}/>
                    <button className="editar" onClick={guardar}>Guardar</button>

                    <button className="eliminar" onClick={() => setMostrarForm(false)}>Cancelar</button>
                </div>
                
            </div>
        )}
<div className="table">
        <table className="table table-striped" >
            <thead> 
            <tr>    
                <th scope="col">ID</th>
                <th scope="col">Reporte</th>
                <th scope="col">Activo</th>
                <th scope="col">Tecnico</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {
                datos.map(orden_trabajo => (
                <tr key={orden_trabajo.id}> 
                <td>{orden_trabajo.orden_id}</td>
                <td>{orden_trabajo.reporte}</td>
                <td>{orden_trabajo.activo}</td>
                <td>{orden_trabajo.tecnico} </td>
                <td>{orden_trabajo.descripcion}</td>
                <td>{orden_trabajo.estado}</td>
                <td>{orden_trabajo.fecha}</td>
                <td><button className="editar"  onClick={() => editar(orden_trabajo)}>Editar</button>
                <button className="eliminar" onClick={() => eliminar(orden_trabajo.orden_id)}>Eliminar</button></td>
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