import "../estilos/administracion.css"
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import useFallas from "../hooks/UseFallas";
export default function ReporteFallas(){
        const [datos, error, cargando, setDatos] = useFallas();
        const navigate = useNavigate();
        const [mostrarForm, setMostrarForm] = useState(false);
        const [form, setForm] = useState({
            falla_id: null,
            activo: "",
            descripcion: "",
            prioridad: "",
            estado: "",
            fecha: "",

    
        });
        const nuevo = () => {
        setForm({id: null,
        activo: "",descripcion: "",prioridad: "", estado: "", fecha: ""});
        setMostrarForm(true);
        };

        const editar = (reporte_falla) => {
            setForm({ ...reporte_falla });
            setMostrarForm(true);
        }

        const guardar = async () => {
            if(!form.activo || !form.descripcion || !form.prioridad || !form.estado || !form.fecha) return alert("completa los campos");
            const url = form.falla_id ? `http://localhost:5000/reporte_falla/${form.falla_id}`: `http://localhost:5000/reporte_falla`;
            const method = form.falla_id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form),
            });
            if(!res.ok) return alert("error al guardar")
                else alert("reporte guardado con exito");
            const nueva = await fetch("http://localhost:5000/reporte_falla") .then((r) => r.json());
            setDatos(nueva);
            setMostrarForm(false);
            
            // Implementation for saving the report
        };

            const eliminar = async (falla_id) => {
            if(!window.confirm("confirmar eliminar esta orden de trabajo")) return;
            const res = await fetch(`http://localhost:5000/reporte_falla/${falla_id}`, {
                method: 'DELETE',
            });
            if(!res.ok) return alert("error al eliminar");
            const nueva = await fetch("http://localhost:5000/reporte_falla") .then((r) => r.json());
            setDatos(nueva);
        };

        const handleLogout = () => {
        navigate("/dassboar");
        };
    
    return(
           <div className="orden-contenido">  
        <div style={{padding: '10px', textAlign: 'right'}}>
            <button className="boton-regreso" onClick={handleLogout}><a href="#"></a>Regresar </button>
        </div>
        <button className="boton-regreso" onClick={nuevo}>
            Nuevo Reporte de Falla
        </button>
        {mostrarForm && (
            <div className="card mb-3">
                <div className="card-body"> 
                    <h5>crear reporte de falla</h5>
                    <input className="form-control mb-2" placeholder="activo" value={form.activo} onChange={(e) => setForm({...form, activo: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Descripcion" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Prioridad" value={form.prioridad} onChange={(e) => setForm({...form, prioridad: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Estado" value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Fecha" type="date" value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}/>
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
                <th scope="col">Activo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {
                datos.map(reporte_falla => (
                <tr key={reporte_falla.id}> 
                <td>{reporte_falla.falla_id}</td>
                <td>{reporte_falla.activo}</td>
                <td>{reporte_falla.descripcion}</td>
                <td>{reporte_falla.prioridad}</td>
                <td>{reporte_falla.estado}</td>
                <td>{reporte_falla.fecha}</td>
                <td><button className="editar" onClick={() => editar(reporte_falla)}>Editar</button>
                <button className="eliminar" onClick={() => eliminar(reporte_falla.falla_id)}>Eliminar</button></td>
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