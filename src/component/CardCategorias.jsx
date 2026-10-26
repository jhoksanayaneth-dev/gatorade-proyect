import React from 'react'
import cavador from "../assets/cavador.png"
import coche from "../assets/coche.png"
import conexion from "../assets/conexion.png"
import herramientas from "../assets/herramientas-manuales.png"
import infraestructura from "../assets/infraestructura.png"
import teleconferencia from "../assets/teleconferencia.png"

export default function CardCategorias() {
  return (
    <div className="contenido">
    <h3 className="tuitulo-barra">Activos por categoria</h3>
    <div className="categorias">
      
        <p className="categoria"><img src={cavador} width="20px" alt="maquinaria" />Maquinaria pesada: <strong>400 (32%)</strong></p> 
      
        <p className="categoria"><img src={coche} width="20px" alt="vehiculos" />Vehiculos:<strong>300 (24%)</strong></p> 
      
        <p className="categoria"><img src={teleconferencia} width="20px" alt="equipos" />Equipos de oficina:<strong>200 (16%)</strong></p> 
      
        <p className="categoria"><img src={infraestructura} width="20px" alt="infraestructura" />Infraestructura:<strong>150 (12%)</strong></p> 
      
        <p className="categoria"><img src={herramientas} width="20px" alt="herramientas" />Herramientas:<strong>95 (8%)</strong></p> 
      
        <p className="categoria"><img src={conexion} width="20px" alt="otros" />Otros:<strong>100 (8%)</strong></p> 
    </div>
    <button className="boton-contenido gestionar">Gestionar categorias</button>
  </div>
  )
}
