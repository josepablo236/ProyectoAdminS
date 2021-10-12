import React, {useState, Fragment, useContext} from 'react';
import gif from '../../img/gifViaje.gif';
import Map from './Map';
import {ImagenContext} from '../../context/ImagenContext';

const Resultado = () => {

    //State de la imagen que viene desde el context
    const { info } = useContext(ImagenContext);

    const [loading, guardarLoading] = useState(true);

    const llaveMaps = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA0NVVStVIJVAnm95X0VbQ_XGinxY9R-do`;

    //Tiempo de carga
    setTimeout(()=>{
        guardarLoading(false);
    }, 5000);

    if(loading){
        return(
            <div className="fluid gif">
            <div className="container-sm contenedor">
                {/* <img src="https://cdn.dribbble.com/users/722246/screenshots/4400319/loading_crescor_dribbble.gif" alt="loading" width="100%"/> */}
                <img src={gif} alt="loading" width="100%" height="900"/>
            </div>
            </div>
        );
    }
    else{
        return ( 
            <Fragment>
                <h1>Resultado: {info.nombre}</h1>
                <Map/>
            </Fragment>
            );
    }
}
 
export default Resultado;