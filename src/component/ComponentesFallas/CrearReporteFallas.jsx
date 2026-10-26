import "../../estilos/OrdenTrabajo.css"
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import useActivos from "../../hooks/UseFallas";

export default function CrearReporteFallas(){   
        const navigate = useNavigate();
        const initialFrom = {
            falla_id: null,
            activo: "",
            descripcion: "",
            prioridad: "",
            estado: "",
            fecha: "",
        };

        const [form, setForm] = useState(initialFrom);

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
            setForm(initialFrom);
            
            // Implementation for saving the report
        };

        const handleLogout = () => {
        navigate("/dassboar");
        };
    
    return(
    <div className="orden-contenido">  
        <div style={{padding: '10px', textAlign: 'right'}}>
            <button className="boton-regreso" onClick={handleLogout}><a href="#"></a>Regresar </button>
        </div>

            <div className="card mb-3">
                <div className="card-body"> 
                    <h5>crear reporte de falla</h5>
                    <input className="form-control mb-2" placeholder="activo" value={form.activo} onChange={(e) => setForm({...form, activo: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Descripcion" value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Prioridad" value={form.prioridad} onChange={(e) => setForm({...form, prioridad: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Estado" value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value})}/>
                    <input className="form-control mb-2" placeholder="Fecha" type="date" value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}/>
                    <button className="editar" onClick={guardar}>Guardar</button>

                </div>

            </div>
    </div>
    );
}
    