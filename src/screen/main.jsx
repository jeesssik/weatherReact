import React from 'react';
import './main.css';
//importo el contexto
import { ClimaContext } from '../context/ClimaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';



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
  
    return (
  
    <div className="container-fluid">
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
                         <h1 className="card-text">{ clima.descripcion}</h1>
                        <p className="temp">{ clima.temperatura}</p>
                        <h3 className="card-text">Humidity <br/>{ clima.humedad}%</h3>
                       
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-lg-8">
                    <div className="card-bodyR">
                        <div className="row">
                            <div className="">
                                <button>C°</button>
                                <button>F°</button>
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
                                                    <div>{clima.main.temp}</div>
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
                    <h3 id='today'>Today Highlights</h3>
                        {climaSemana.slice(0, 1).map((clima) => (
                            <>
                                <div className='row rowa'>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>Wind status</h6>
                                             <h1>{clima.wind.speed}</h1>
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>Humidity</h6> 
                                            <h1>{clima.main.humidity}%</h1>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='row rowa'>
                                    
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>
                                            <h6>Visibility</h6>
                                            <h1>{clima.visibility}</h1>
                                        </div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4 '>
                                        
                                        <div><h6>Pressure</h6>
                                         <h1>{clima.main.pressure}</h1>
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