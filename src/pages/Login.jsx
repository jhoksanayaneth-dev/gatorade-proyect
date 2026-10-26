import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext.jsx";
import "../estilos/login-renamed.css"

export default function Login({onLogin}){
    const { login } = useContext(AuthContext);
    const [nombre, setNombre] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("solicitante");
    const [vista, setvista] = useState("login");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    })
    const data = await res.json();
    if(!res.ok) {
      console.error(data.error);
      alert(data.error || "Error en el inicio de sesión");
      return;
    }

    login( data.token, data.user );
    navigate("/dassboar");

    setemail("");
    setPassword("");
  }  catch(error){
      alert("Error en el inicio de sesión");
    }

};

const registro = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nombre, email, password, rol}),
      })
        const data = await res.json();
        if(!res.ok) {
          alert(data.error || "Error en el registro");
          return;
        }
        alert("Registro exitoso, por favor inicia sesión");
        setvista("login");
        setemail("");
        setPassword("");
        setNombre("");
        setRol("solicitante");

    } catch(error){
        alert("Error en el registro");
        console.error(error);
    }

}


    return(
        <div className="login-cuerpo">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" />
            <section className="login-cuerpo-inicio">
                <div className="login-parte-superior">
                    <div className="login-logo"> 
                        <p className="login-log">SENA</p>
                        <h1 className="login-titulo">
                            MAFIS
                        </h1>
                    </div>
                    <div className="login-parrafo-inicio">
                            <p className="login-parrafo">
                                Sistema de gestion de mantenimiento de activos fijos servicio nacional de aprendizaje sena
                            </p>
                            <div className="login-vista">
                                {vista === "login" && "inicio de sesion"}
                                {vista === "registro" && "crear cuenta"}
                                {vista === "recuperar" && "recuperar contraseña"}
                            </div>
                    </div>
                </div>

                {vista === "login" && (
                    <form onSubmit={handleLogin}>
                <div className="login-panel" >
                <div className="login-usuario">
                    <label htmlFor="usuario" className="login-label-usuario">Correo Electronico</label>
                    <input type="email" id="usuario" className="login-input-usuario" placeholder="Correo electronico"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <label htmlFor="contraseña" className="login-label-contraseña">Contraseña</label>
                    <input type="password" id="contraseña" className="login-input-contraseña" placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
                </div>
                <div className="login-boton-inicio-sesion">
                    <button className="login-boton-inicio" type="submit" >Iniciar Sesion</button>
                    <div className="login-links">
                        <a href="#" className="login-link-olvido-contraseña" onClick={() => (setvista("registro"))}>Crear cuenta </a>
                        <div className="login-separador">
                            |
                        </div>
                        <p>
                        <a  href="#" className="login-link-crear-cuenta" onClick={() => (setvista("recuperar"))}>Olvide mi contraseña</a>
                        </p>
                        
                    </div>
                </div>
                </div>
                </form>
                )}

                {vista === "registro" && (
                    <form onSubmit={registro}>
                    <div className="login-panel-registro" >
                        <div className="login-usuario-registro">
                        <label htmlFor="nombre completo" >Nombre Completo</label>
                        <input type="text" id="nombre completo" className="login-input-nombre" placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                        />
                        <label htmlFor="correo electronico">Correo Electronico</label>
                        <input type="email" id="correo electronico" className="login-input-usuario" placeholder="Correo electronico"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}

                        />
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" className="login-input-contraseña" placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        />
                        <label htmlFor="rol">rol</label>
                        <select name="" id="" value={rol} onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="solicitante">solicitante </option>
                            <option value="tecnico">tecnico</option>
                            <option value="administrador">Administrador</option>    
                        </select>
                        
                        <div className="login-links-registro">
                            <button className="login-boton-registro" type="submit">crear cuenta</button>
                            <a
                            type="button"
                            className="login-link-crear-cuenta"
                            onClick={() => setvista("login")}
                            >    
                            volver al inicio de sesion
                            </a>
                        </div>
                        </div>
                    </div>
                    </form>
                )}
                {vista === "recuperar" && (
                    <div className="login-panel-recuperar">
                        <label htmlFor="correo electronico">Correo Electronico</label>
                        <input type="email" id="correo electronico" className="login-input-usuario" placeholder="Correo electronico"

                        />

                        
                        <div className="login-links-recuperar">
                            <button 
                        className="login-boton-inicio"
                        >
                        Recuperar contraseña
                        </button>
                            <a
                            type="button"
                            className="login-link-crear-cuenta"
                            onClick={() => setvista("login")}
                            >    
                            volver al inicio de sesion
                            </a>
                        </div>
                    </div>
                )}
            </section>


        </div>

    )
}