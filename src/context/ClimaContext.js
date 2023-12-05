// componente de contexto
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// crear el context
export const ClimaContext = createContext();

// provider es donde se encuentran las funciones y state

const ClimaProvider = (props) => {

    // crear el state del context
    const [clima, setClima] = useState({
        ciudad: 'Buenos Aires',
        pais: 'ar-b',
        temperatura: '',
        humedad: '',
        descripcion: '',
        error: false
    });

    // state de clima de la semana
    const [climaSemana, setClimaSemana] = useState([]);


    const [consultar, setConsultar] = useState(true);

    const { ciudad, pais, temperatura, humedad, descripcion, error,fondo, icono } = clima;


    useEffect(() => {
        const consultarAPI = async () => {

            if (consultar) {
                const appId = '572439d21bda87f48f83dc74b1793e24';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`;

                const respuesta = await axios.get(url);

                setClima({
                    ciudad: respuesta.data.name,
                    pais: respuesta.data.sys.country,
                    temperatura: respuesta.data.main.temp,
                    humedad: respuesta.data.main.humidity,
                    descripcion: respuesta.data.weather[0].description,
                    error: false
                })
            }
        }
        consultarAPI();
    }, [consultar, ciudad, pais]);

    if (clima.descripcion === 'clear sky') {

        clima.fondo = 'http://pngimagesfree.com/Background/Cloud/Sund_Cloud_sky_png_background.png';
        clima.icono= 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png'
    } else if (clima.descripcion === 'few clouds') {
            
            clima.fondo = 'https://porinkulttuurisaato.org/poribiennale2020/assets/img/pilvi.png';
            clima.icono = 'https://www.cabo.com/images/weather/owm-icons/512/02d.png'
     }else if(clima.descripcion ==='broken clouds'){
        clima.fondo = 'https://porinkulttuurisaato.org/poribiennale2020/assets/img/pilvi.png';
        clima.icono = 'https://icons.veryicon.com/png/o/weather/weather-15/few-clouds.png'
     }else if(clima.descripcion ==='scattered clouds'){
        clima.fondo = 'https://porinkulttuurisaato.org/poribiennale2020/assets/img/pilvi.png';
        clima.icono = 'https://icons.veryicon.com/png/o/weather/weather-15/few-clouds.png'
        }else if(clima.descripcion ==='shower rain'){
            clima.fondo = 'https://porinkulttuurisaato.org/poribiennale2020/assets/img/pilvi.png';
            clima.icono = 'https://icons.veryicon.com/png/o/weather/weather-15/rain.png'
        }else if(clima.descripcion ==='light rain'){
            clima.fondo = 'https://pngimg.com/uploads/rain/rain_PNG13462.png';
            clima.icono = 'https://cdn3.iconfinder.com/data/icons/sunnyday-2/142/light_cloudy_heavy_rain-512.png'
        }


    //useeffect que trae el clima por hora
    
    useEffect(() => {
        const consultarAPI = async () => {

            if (consultar) {
                const appId = '572439d21bda87f48f83dc74b1793e24';
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad},${pais}&appid=${appId}&units=metric`;

                const respuesta = await axios.get(url);

                setClimaSemana(respuesta.data.list);
            }
        }
        consultarAPI();
    }, [consultar, ciudad, pais]);


    return (
        <ClimaContext.Provider
            value={{
                clima,
                setConsultar,
                climaSemana
            }}
        >
            {props.children}
        </ClimaContext.Provider>
    )


}

export default ClimaProvider;





