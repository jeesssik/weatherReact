//contexto para los fondos de las imagenes
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//crear el context
export const FondosContext = createContext();

//provider es donde se encuentran las funciones y state
const FondosProvider = (props) => {
    //funcion para obtener el fondo de la imagen segun el clima recibido en el parametro

    const [fondo, setFondo] = useState({});
    const [clima, setClima] = useState({});
    const [error, setError] = useState(false);
    const [consultar, setConsultar] = useState(false);

    const { ciudad } = clima;


    
    


}

export default FondosProvider;