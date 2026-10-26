import React from 'react'
import senaLogo from "../assets/Sena_Colombia_logo.svg.png"
import analisis from "../assets/analisis-de-datos.png"
import informeSeo from "../assets/informe-seo.png"
import carpeta from "../assets/carpeta.png"
import hoja from "../assets/hoja-de-papel.png"
import llave from "../assets/llave-inglesa.png"
import usuarios from "../assets/silueta-de-multiples-usuarios.png"
import engranaje from "../assets/engranaje.png"
import calendariosibar from "../assets/calendariosibar.png"
import { useNavigate } from 'react-router-dom'

export default function SidebarDashboard() {
    const navigate = useNavigate();

    const handleActivosClick = () => {
    navigate("/dassboar/activos");
  };
  const handleOrdenTrabajoClick = () => {
    navigate("OrdeDetrabajo");
  };
  const handleReporteFallasClick = () => {
    navigate("ReporteFallas");
  };

  const handleCrearReporteFallasClick = () => {
    navigate("CrearReporteFallas");
  };
  const handleLogout = () => {
        navigate("/dassboar");
    };
  const handleAdministracionClick = () => {
    navigate("Administracion");
  };
  return (
    <div>
      <section className="">
          <div className="titulo-mafis">
            <img src={senaLogo} width="50px" height="50px" alt="sena" />
            <h1>MAFIS</h1>
          </div>
          <div className="boton-registros">
            <button className="regitros-boton"onClick={handleCrearReporteFallasClick}>+ Reportar Falla</button>
          </div>
          <div className="opciones-dashboard">
            <nav className="navegacion-dashboard">
              <button className="boton-paneles" onClick={handleLogout}><a href="#"><img src={analisis} alt="analisis" width="30px" /></a>Inicio</button>
              <button className="boton-paneles" onClick={handleReporteFallasClick}><a href="#"><img src={informeSeo} alt="informe" width="30px" /></a>Reportes de falla</button>
              <button className="boton-paneles" onClick={handleOrdenTrabajoClick}><a href="#"><img src={carpeta} alt="carpeta" width="30px" /></a>Ordenes de trabajo</button>
              <button className="boton-paneles" onClick={handleActivosClick}><a href="#"><img src={hoja} alt="hoja" width="30px" /></a>Gestion de activos</button>
              <button className="boton-paneles"> <a href="#"><img src={calendariosibar} alt="hoja" width="30px" /></a>Mantenimientos</button>
              <button className="boton-paneles"><a href="#"><img src={llave} alt="llave" width="30px" /></a>Repuestos</button>
            </nav>
            <div>
              <h3 className="contactos">Contactos</h3>
              <nav className="administracion-configuracion">
                <button className="boton-paneles" onClick={handleAdministracionClick}><a href="#"><img src={usuarios} alt="usuarios" width="30px" /></a>Administracion</button>
                <button className="boton-paneles"><a href="#"><img src={engranaje} alt="engranaje" width="30px" /></a>Configuracion</button>
              </nav></div>
          </div>
        </section>
    </div>
  )
}
