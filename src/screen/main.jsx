import React, { useState } from 'react';
import './main.css';
//importo el contexto
import { ClimaContext } from '../context/ClimaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const translations = {
  es: {
    humidity: 'Humedad',
    wind: 'Viento',
    direction: 'Dirección',
    gusts: 'Ráfagas',
    clouds: 'Nubosidad',
    pressure: 'Presión',
    precipitation: 'Precipitación',
    today: 'Hoy',
    highlights: 'Destacados de hoy',
    celsius: 'C°',
    fahrenheit: 'F°',
    km: 'km',
    ms: 'm/s',
    mm: 'mm',
    rain: 'lluvia',
    snow: 'nieve',
  },
  en: {
    humidity: 'Humidity',
    wind: 'Wind',
    direction: 'Direction',
    gusts: 'Gusts',
    clouds: 'Cloudiness',
    pressure: 'Pressure',
    precipitation: 'Precipitation',
    today: 'Today',
    highlights: 'Today Highlights',
    celsius: 'C°',
    fahrenheit: 'F°',
    km: 'km',
    ms: 'm/s',
    mm: 'mm',
    rain: 'rain',
    snow: 'snow',
  }
};

const weatherDescriptions = {
  'clear sky': { es: 'Cielo despejado', en: 'Clear sky' },
  'few clouds': { es: 'Pocas nubes', en: 'Few clouds' },
  'scattered clouds': { es: 'Nubes dispersas', en: 'Scattered clouds' },
  'broken clouds': { es: 'Nubes rotas', en: 'Broken clouds' },
  'shower rain': { es: 'Chubascos', en: 'Shower rain' },
  'rain': { es: 'Lluvia', en: 'Rain' },
  'thunderstorm': { es: 'Tormenta', en: 'Thunderstorm' },
  'snow': { es: 'Nieve', en: 'Snow' },
  'mist': { es: 'Niebla', en: 'Mist' },
  // agrega más según lo que recibas de la API
};

function traducirDescripcion(desc, lang) {
  const key = desc?.toLowerCase();
  if (weatherDescriptions[key]) return weatherDescriptions[key][lang];
  return desc; // fallback si no está en el diccionario
}

function Main() {
    //uso el contexto
    const {clima} = React.useContext(ClimaContext);
    const{climaSemana}= React.useContext(ClimaContext);
  console.log(climaSemana)

  const obtenerIconoClima = (tipoClima) => {
    switch (tipoClima) {
        case 'Clear':
            return <FontAwesomeIcon icon={faSun} />;
        case 'Clouds':
            return <FontAwesomeIcon icon={faCloud} />;
        case 'Rain':
            return <FontAwesomeIcon icon={faCloudRain} />;
        case 'Snow':
            return <FontAwesomeIcon icon={faSnowflake} />;
        default:
            return null;
    }
};
    const [unidad, setUnidad] = useState('C');
    const [lang, setLang] = useState('es');
    const t = translations[lang];

    const convertirTemp = (tempC) => {
        if (unidad === 'C') return Math.round(tempC);
        // Celsius a Fahrenheit
        return Math.round((tempC * 9) / 5 + 32);
    };
  
    // Determina el momento del día
    const hora = new Date().getHours();
    let bgTimeClass = "bg-afternoon";
    if (hora >= 6 && hora < 12) bgTimeClass = "bg-morning";
    else if (hora >= 12 && hora < 18) bgTimeClass = "bg-afternoon";
    else if (hora >= 18 && hora < 21) bgTimeClass = "bg-evening";
    else bgTimeClass = "bg-night";

    // Determina el clima principal
    const weatherMain = clima?.descripcion?.toLowerCase() || "";
    let bgWeatherClass = "";
    if (weatherMain.includes("clear") || weatherMain.includes("despejado")) bgWeatherClass = "bg-clear";
    else if (weatherMain.includes("cloud") || weatherMain.includes("nublado")) bgWeatherClass = "bg-clouds";
    else if (weatherMain.includes("rain") || weatherMain.includes("lluvia")) bgWeatherClass = "bg-rain";
    else if (weatherMain.includes("snow") || weatherMain.includes("nieve")) bgWeatherClass = "bg-snow";

    // Combina ambas clases para un efecto sutil y personalizado
    const bgClass = `${bgTimeClass} ${bgWeatherClass}`.trim();

    return (
  
    <div className={`container-fluid ${bgClass}`}>
      <div style={{position: 'absolute', top: 20, right: 30, zIndex: 10}}>
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
        <div className="row">
            <div className="col-md-6 col-lg-4">
                <div
                    id="izq"
                    style={{
                        backgroundImage: `url(${clima.fondo})`,
                        backgroundSize: 'cover',
                        borderRadius: '25px',
                        height: '100vh'
                    }}
                >
                    <div className="card-bodyL">
                        <img src={clima.icono} alt='logo clima' id='logoClima'/>
                        <h1 className="card-text">{traducirDescripcion(clima.descripcion, lang)}</h1>
                        <p className="temp">
                            {convertirTemp(clima.temperatura)}°{unidad}
                        </p>
                        <div className="extra-info">
          <span>{t.humidity}: {clima.humedad}%</span>
        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-lg-8">
                    <div className="card-bodyR">
                        <div className="row">
                            <div>
                                <button
                                    onClick={() => setUnidad('C')}
                                    style={{
                                        background: unidad === 'C' ? '#356ae6' : '#4f8cff',
                                        color: '#fff'
                                    }}
                                >
                                    {t.celsius}
                                </button>
                                <button
                                    onClick={() => setUnidad('F')}
                                    style={{
                                        background: unidad === 'F' ? '#356ae6' : '#4f8cff',
                                        color: '#fff'
                                    }}
                                >
                                    {t.fahrenheit}
                                </button>
                            </div>
                        </div>
                    </div>
                <div className='container'>
                    <div className='row hoy'>
                    {climaSemana.slice(0, 5).map((clima, index) => {
                            return (
                                        <div key={index} className="col-md-6 col-lg-2">
                                                <div id='tarjetita' className='card'>
                                                    <div>{new Date(clima.dt_txt).toLocaleDateString('es-ES')}</div>
                                                    <div>{convertirTemp(clima.main.temp)}°{unidad}</div>
                                                    <div>{clima.weather[0].main}</div>
                                                    <div>{obtenerIconoClima(clima.weather[0].main)}</div>
                                                </div>
                                            </div>
                                );
                    })}
                    </div>
                </div>


                    
            <div className="section">
                <div>
                    <h3 id='today'>{t.highlights}</h3>
                        {climaSemana.slice(0, 1).map((clima) => (
                            <>
                                <div className='row rowa'>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>{t.wind}</h6>
                                            <h1>{clima.wind.speed} {t.ms}</h1>
                                            <span>{t.direction}: {clima.wind.deg}°</span>
                                            {clima.wind.gust && <span>{t.gusts}: {clima.wind.gust} {t.ms}</span>}
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>{t.humidity}</h6> 
                                            <h1>{clima.main.humidity}%</h1>
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>{t.clouds}</h6>
                                            <h1>{clima.clouds?.all ?? 'N/A'}%</h1>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='row rowa'>
                                    
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>Visibilidad</h6>
                                            <h1>{clima.visibility ? (clima.visibility / 1000) + ' km' : 'N/A'}</h1>
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>{t.pressure}</h6>
                                            <h1>{clima.main.pressure} hPa</h1>
                                            {clima.main.sea_level && <span>Mar: {clima.main.sea_level} hPa</span>}
                                            {clima.main.grnd_level && <span>Suelo: {clima.main.grnd_level} hPa</span>}
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>{t.precipitation}</h6>
                                            <h1>
                                                {clima.rain?.['1h'] ? clima.rain['1h'] + ' mm' : clima.snow?.['1h'] ? clima.snow['1h'] + ' mm nieve' : '0 mm'}
                                            </h1>
                                        </div>
                                        
                                    </div>
                                </div>
                            </>
                        ))}
                                    
                               
                            
                </div>
            </div>

    </div>
    </div>
    </div>
   
  );
}

export default Main;