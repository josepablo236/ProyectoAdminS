import React from 'react';
import Camara from '../../img/camara.svg';
import Analisis from '../../img/analisis.svg';
import Mapa from '../../img/mapa.svg';
import Viaje from '../../img/viaje.svg';
const Pasos = () => {

    return ( 
        <div className="container mb-4">
            <div className="row titulo-contenedor">
            <h1 className="titulo-seccion">Pasos a seguir:</h1>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Elige una imagen o toma una foto del lugar</p>
                    <img src={Camara} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Presiona “Enviar” para analizar la foto seleccionada</p>
                    <img src={Analisis} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Observa la ubicación y clima resultante</p>
                    <img src={Mapa} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Ve las recomendaciones que tenemos para ti</p>
                    <img src={Viaje} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
            </div>
        </div>
     );
}
 
export default Pasos;