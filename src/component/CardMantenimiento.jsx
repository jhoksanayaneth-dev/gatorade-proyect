import React from 'react'
import useActivos from '../hooks/UseFallas'    
export default function CardMantenimiento() {
  return (
    <div className="contenido"> 
          <h3 className="tuitulo-barra">Próximos Mantenimientos</h3>
          <article className="informacion-lista">
            <div className="informacion">
              <strong>Compresor A-3</strong><br />
              Tipo: Preventivo<br />
              Fecha: 24/07/2024 - <a href="#" className="link">Pendiente</a>
            </div>
            <div className="informacion">
              <strong>aire acondicionado - samsung</strong><br />
              Tipo: Correctivo<br />
              Fecha: 25/07/2024 - <a href="#" className="link">Pendiente</a>
            </div>
            <div className="informacion">
              <strong>bomba de agua</strong><br />
              Tipo: Predictivo<br />
              Fecha: 26/07/2024 - <a href="#" className="link">Pendiente</a>
            </div>
            <div className="informacion">
              <strong>Equipo de aula 5</strong><br />
              Tipo: Preventivo<br />
              Fecha: 27/07/2024 - <a href="#" className="link">Pendiente</a>
            </div>
          </article>
          <button className="boton-contenido">Ver Calendario</button>
    </div>
  )
}
