import React, {useState, Fragment, useContext} from 'react';
import gif from '../../img/gifViaje.gif';
import Map from './Map';
import {ImagenContext} from '../../context/ImagenContext';
import Clima from './Clima';
import Recomendaciones from './Recomendaciones';
import Retro from './Retro';
import Form from './Form';
import Footer from '../principal/Footer';

const Resultado = () => {

    //State de la imagen que viene desde el context
    const { imagen } = useContext(ImagenContext);

    const [loading, guardarLoading] = useState(true);

    //Tiempo de carga
    setTimeout(()=>{
        guardarLoading(false);
    }, 5000);

    if(loading){
        return(
            <div className="fluid gif">
            <div className="container-sm contenedor">
                <img src={gif} alt="loading" width="100%"/>
            </div>
            </div>
        );
    }
    else{
        return ( 
            <Fragment>
                <div className="container center">
                    <h1>Resultado: {imagen.nombre}</h1>
                </div>
                <Map/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Clima/>
                        </div>
                        <div className="col-md-6">
                            <Recomendaciones/>
                        </div>
                    </div>
                    <Retro/>
                    <div className="row center mt-3">
                        <div className="col-sm-6">
                            <Form/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </Fragment>
            );
    }
}
 
export default Resultado;