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
                         <p className="card-text">{ clima.descripcion}</p>
                        <p className="temp">{ clima.temperatura}</p>
                        <p className="card-text">Humedad <br/>{ clima.humedad}%</p>
                       
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-lg-8">
    
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
                    <h1>Today Highlights</h1>
                        {climaSemana.slice(0, 1).map((clima) => (
                            <>
                                <div className='row rowa'>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>Wind status: {clima.wind.speed}</div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>WInd status: {clima.wind.speed}</div>
                                        
                                    </div>
                                </div>
                                <div className='row rowa'>
                                    
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>Visibility: {clima.visibility}</div>
                                        
                                    </div>
                                    <div className='indivi col-lg-4'>
                                        
                                        <div>Pressure: {clima.main.pressure}</div>
                                        
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