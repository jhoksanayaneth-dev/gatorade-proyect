import React from 'react'
import { useNavigate } from 'react-router-dom';
import useActivos from '../hooks/useActivos';
import useOrden from '../hooks/UseOrden';
export default function CardActivos() {
    const [datosOrden] = useOrden();
    const navigate = useNavigate();
    const [datos, setDatos] = useActivos();

    const handleActivosClick = () => {
    navigate("/dassboar/activos");
  };

  const totalOrdenes = datosOrden.length;

  const totalActivos = datos.length;

  const total = totalActivos + totalOrdenes;

  const Operativos = datos.filter(Activos => Activos.estado === "Activo").length;
  const fueraServicio = datosOrden.filter(orden => orden.estado === "Urgente" || "Programada" || "Retrasada").length;
  const retrasadas = datos.filter(Activos => Activos.estado === "Retrasadas").length;
  const hoy = new Date().toLocaleDateString('en-CA');
  const ordenesHoy = datos.filter(
     orden => orden.fecha === hoy
  ).length;
  
  const porcentajeOperativosOrden = total > 0
   ? Math.round((fueraServicio / total ) * 100) 
  : 0;

  const porcentajeOperativos = total > 0
  ? Math.round((Operativos / total) * 100)
  : 0;
  return (
    <div className="contenido">
          <h3 className="tuitulo-barra">Estado General de Activos</h3>
          <h2 className="datos-barra">{total}</h2> 
          <article className="status-list">
            <div className="barra-progreso">
              Operativos: <progress value={Operativos} max={total} className="barra" /> <strong>{Operativos} ({porcentajeOperativos}%)</strong>
            </div>
            <div className="barra-progreso">
              En <br /> Mantenimiento: <progress value={12} max={100} className="barra" /> <strong>150 (12%)</strong>
            </div>
            <div className="barra-progreso">
              Fuera de <br /> Servicio: <progress value={fueraServicio} max={total} className="barra" /> <strong>{fueraServicio} ({porcentajeOperativosOrden}%)</strong>
            </div>
            <div className="barra-progreso">
              Pendientes de <br /> Revisión: <progress value={3} max={100} className="barra" /> <strong>55 (3%)</strong>
            </div>
          </article>
          <button className="boton-contenido" onClick={handleActivosClick}>Ver Todos los Activos</button>
    </div>
  )
}
