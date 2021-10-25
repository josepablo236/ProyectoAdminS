import React, {useContext, Fragment} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import weather from '../../img/weather.svg';

const Clima = () => {
    //State de la imagen que viene desde el context
    const { clima, errorclima } = useContext(ImagenContext);

    const {nombre, temp, temp_max, temp_min} = clima;

    return ( 
        <div className="card text-white bg-info text-center mt-5">
            <div className="card-body">
                {
                    (!errorclima)
                    ?
                    <Fragment>
                        <h1>El clima en {nombre} es:</h1>
                        <h2>
                        {temp}<span>&#x2103;</span>
                        </h2>
                        <img src={weather} className="card-img mb-3" alt="..." height="200px"/>
                        <p>Temperatura máxima: 
                        {temp_max}<span>&#x2103;</span>
                        </p>
                        <p>Temperatura mínima: 
                        {temp_min}<span>&#x2103;</span>
                        </p>
                    </Fragment>
                    :
                    <Fragment>
                        <h1>No se pudo obtener el clima</h1>
                        <p>Lo sentimos, no se encontraron resultados.</p>
                    </Fragment>
                }
            </div>
        </div>
     );
}
 
export default Clima;