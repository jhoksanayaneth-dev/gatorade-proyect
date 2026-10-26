import React from 'react'
import coche from "../assets/coche.png"
import conexion from "../assets/conexion.png"
import infraestructura from "../assets/infraestructura.png"

export default function CardActividadReciente() {
  return (
    <div className="contenido historial">
    <h3 className="tuitulo-barra">actividad reciente </h3>
    <article className="actividad-reciente">
      <div className="actividad">
        <img src={conexion} width="20px" height="20px" alt="conexion" />
        <div>
          <strong>Orden #OT-2024-005 completada para 'Generador G-1'</strong><br />
          Hace 10 min por Juan Pérez</div>
      </div>
      <div className="actividad">
        <img src={coche} width="20px" height="20px" alt="coche" />
        <div>
          <strong>Nuevo activo 'motor V-12' añadido</strong><br />
          Ayer 14:30 por María López</div>
      </div>
      <div className="actividad">
        <img src={conexion} width="20px" height="20px" alt="conexion" />
        <div>
          <strong>Alerta crítica: 'Compresor B-2' con nivel de aceite bajo</strong><br />
          Hace 3 horas por Sistema</div>
      </div>
      <div className="actividad">
        <img src={infraestructura} width="20px" height="20px" alt="infraestructura" />
        <div>
          <strong>Mantenimiento preventivo programado para 'Línea de Producción 2'</strong><br />
          Hoy 09:00 por Pedro García</div>
      </div>
      <div className="actividad">
        <img src={infraestructura} width="20px" height="20px" alt="infraestructura" />
        <div>
          <strong>Ubicación 'Almacén Principal' actualizada</strong><br />
          Hace 1 día por Ana Ruiz</div>
      </div>
    </article>
    <button className="boton-contenido">Ver Historial Completo</button>
  </div>
  )
}
