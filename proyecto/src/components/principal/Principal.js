import React, {Fragment, useContext} from 'react';
import Header from './Header';
import Pasos from './Pasos';
import Informacion from './Informacion';
import Footer from './Footer';
import {ImagenContext} from '../../context/ImagenContext';

const Principal = () => {
    //State de la imagen que viene desde el context
    const { guardarFoto, guardarUbicacion, guardarRetro, guardarBase, guardarRegresar } = useContext(ImagenContext);
    
    return ( 
        <Fragment>
            <Header/>
            <Pasos/>
            <Informacion/>
            <Footer/>
        </Fragment>
     );
}
 
export default Principal;