import { useEffect,useState } from "react";

const url = "http://localhost:5000/reporte_falla"

export default function useFallas() {
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState("");
    const [cargando , setCargando] = useState("");




    useEffect(() => {
        setCargando(true)
        fetch(url) //que nospermite conectarnos a la api o flask 
        .then((res) => res.json()) // convertimos los datos a json 
        .then((data) => setDatos(data))
        .catch(error => setError(error)) // llenamos la variable de datos y la pasamos a setdatos
        .finally(() => setCargando(false))
    }, []);

  return [datos, error, cargando, setDatos];
}
