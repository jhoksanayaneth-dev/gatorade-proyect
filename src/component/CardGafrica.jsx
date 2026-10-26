import React from 'react'

export default function CardGafrica() {
  return (
    <div className="contenido grafica">
          <div className="titulo-grafica">
            <h3 className="tuitulo-barra">Costos de Mantenimiento mensual</h3>
            <select name="opcione" id="opcione" className="opcione">
              
              <optgroup> 
                <option>Meses</option>
                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
                <option>Abril</option>
                <option>Mayo</option>
              </optgroup>
            </select>
          </div>
          <div className="sub_board">
            <div className="graf_board">
              <div className="barra-grafica">
                <div className="sub_barra b1">
                  <div className="tag_g">35%</div>
                  <div className="tag_leyenda">Enero</div>
                </div>
              </div>
              <div className="barra-grafica">
                <div className="sub_barra b2">
                  <div className="tag_g">45%</div>
                  <div className="tag_leyenda">Febrero</div>
                </div>
              </div>
              <div className="barra-grafica">
                <div className="sub_barra b3">
                  <div className="tag_g">55%</div>
                  <div className="tag_leyenda">Marzo</div>
                </div>
              </div>
              <div className="barra-grafica">
                <div className="sub_barra b4">
                  <div className="tag_g">75%</div>
                  <div className="tag_leyenda">Abril</div>
                </div>
              </div>
              <div className="barra-grafica">
                <div className="sub_barra b5">
                  <div className="tag_g">85%</div>
                  <div className="tag_leyenda">Mayo</div>
                </div>
              </div>
            </div>
          </div>    
        </div>
  )
}
