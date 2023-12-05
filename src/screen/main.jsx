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
    //estructura de la pagina principal, hecha con bootstrap
    //con una columna izquierda y una derecha, la izquierda más fina que la derecha
    //en la derecha el forecast de la semana, la izquierda con el clima de hoy

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
                        <h5 className="card-title">Clima de hoy</h5>
                        <img src={clima.icono} alt='logo clima' id='logoClima'/>
                        <p className="temp">{ clima.temperatura}</p>
                        <p className="card-text">Humedad <br/>{ clima.humedad}%</p>
                        <p className="card-text">Clima<br/>{ clima.descripcion}</p>
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-lg-8">
            
        {//tengo que recorrer climaSemana para mostrar el forecast de la semana

<div className="section">
<div className="table-responsive">
    <h1>Clima por hora</h1>
            <table className="table" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                <thead>
                    <tr>
                        {climaSemana.map((clima, index) => (
                            <th key={index}>
                                <div id='tarjetita'>
                                    <div>{new Date(clima.dt_txt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>

                                    <div>{clima.main.temp}</div>
                                    <div>{clima.weather[0].main}</div>
                                    <div>{obtenerIconoClima(clima.weather[0].main)}</div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
</div>
</div>


        }
            
            
                
                <table className="table" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                    <thead>
                        <tr>
                            {climaSemana.map((clima, index) => {
                                // Salta de a 7 posiciones
                                if (index % 7 === 0) {
                                    return (
                                        <th key={index}>
                                            <div id='tarjetita'>
                                                <div>{new Date(clima.dt_txt).toLocaleDateString('es-ES')}</div><div>{clima.main.temp}</div>
                                                <div>{clima.weather[0].main}</div>
                                                <div>{obtenerIconoClima(clima.weather[0].main)}</div>
                                            </div>
                                        </th>
                                    );
                                }
                                return null; // No renderizar para las otras posiciones
                            })}
                        </tr>
                    </thead>
                </table>

           
            </div>
        </div>
    </div>
   
  );
}

export default Main;