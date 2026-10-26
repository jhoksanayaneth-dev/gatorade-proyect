import React from 'react'
import campana from "../assets/campana.png"
import perfil from "../assets/horses-from-this-angle-are-weird-v0-4dav7z3btend1.jpg"
import lupa from "../assets/lupa.png"
import { useNavigate } from 'react-router-dom'

export default function HeaderDashboard() {
    const navigate = useNavigate();
    const handleRegreso = () => {
        navigate("/login");
    };
  return (
    <div className="encabezado">
      <h2 className="tuitulo -encabezado">Gestion de mantenimientos de Activos </h2>
        <div className="nav-busqueda">
          <form action="/buscar" method="get" className="form-buscar">
            <input type="text" name="q" placeholder="Buscar activos, tareas, ubicaciones..." className="input-buscar" />
            <button type="submit" className="boton-buscar"><img src={lupa} alt="buscar" width="20px" /></button>
          </form>
          <img src={campana} alt="campana" width="20px" height="20px" />
        </div>
        <div className="imagen-usuario">
          <img className="imagen-usuario" src={perfil} alt="perfil" width="50px" />
          <select name="opcione" id="opcione" className="opcione-encabezado">
            
            <optgroup>
              <option>Opciones</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option onClick={handleRegreso}><button >Cerrar Sesión</button></option>
            </optgroup>
          </select>
        </div>
    </div>
  )
}
