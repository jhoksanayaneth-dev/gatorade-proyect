import React from 'react'
import marca from "../assets/marca.png"

export default function CardAlertas() {
  return (
    <div className="contenido alerta">
    <h3 className="tuitulo-barra">Alertas criticas</h3>
    <article className="alertas-critica">
      <div className="alertas">
        <img src={marca} width="20px" height="20px" alt="marca" />Nivel de aceite bajo en 'Compresor B-2' 
      </div>
      <div className="alertas">
        <img src={marca} width="20px" height="20px" alt="marca" />Fallo de sensor en 'Linea de produccion 3' 
      </div>
      <div className="alertas">
        <img src={marca} width="20px" height="20px" alt="marca" />Activo 'Vehiculo V-5' con ITV caducada 
      </div>
    </article>
    <button className="boton-contenido">Resolver alertas</button>
  </div>
  )
}
