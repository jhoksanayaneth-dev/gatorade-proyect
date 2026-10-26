import React from 'react'
import alarma from "../assets/alarma.png"
import calendario from "../assets/calendario.png"
import peligro from "../assets/peligro.png"
import plus from "../assets/plus.png"
import { useNavigate } from 'react-router-dom'
import useOrden from '../hooks/UseOrden'

export default function CardOrdenes() {
  const [datos,setDatos] = useOrden();
  const navigate = useNavigate();
  
  const handleOrdenTrabajoClick = () => {
    navigate("OrdeDetrabajo");
  };

  const urgentes = datos.filter(orden => orden.estado === "Urgente").length;
  const programadas = datos.filter(orden => orden.estado === "Programadas").length;
  const retrasadas = datos.filter(orden => orden.estado === "Retrasadas").length;
  const hoy = new Date().toLocaleDateString('en-CA');
  const ordenesHoy = datos.filter(
     orden => orden.fecha === hoy
  ).length;

  return (
    
   <div className="contenido">
          <h3 className="tuitulo-barra">Órdenes de Trabajo</h3>
          <h2 className="datos-barra">{datos.length}</h2>
          <article className="orders-list">
            <div className="Ordenes-trabajo">
              <p className="Ordenes"><img src={peligro} width="20px" alt="urgente" />Urgentes:</p> <strong>{urgentes}</strong>
            </div>
            <div className="Ordenes-trabajo">
              <p className="Ordenes"><img src={calendario} width="20px" alt="calendario" />Programadas:</p> <strong>{programadas}</strong>
            </div>
            <div className="Ordenes-trabajo">
              <p className="Ordenes"><img src={alarma} width="20px" alt />Retrasadas:</p> <strong>{retrasadas}</strong>
            </div>
            <div className="Ordenes-trabajo">
              <p className="Ordenes"><img src={plus} width="20px" alt="abiertas" />Abiertas Hoy:</p> <strong>{ordenesHoy}</strong>
            </div>
          </article>
          <button className="boton-contenido" onClick={handleOrdenTrabajoClick}>Gestionar Órdenes</button>
    </div>
  )
}
