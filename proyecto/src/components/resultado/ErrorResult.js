import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const ErrorResult = () => {
    //State de la imagen que viene desde el context
    const { guardarRegresar, guardarFoto, guardarImagen, guardarUbicacion, guardarRetro, guardarBase, guardarNombre, guardarErrormapa, guardarErrorfoto } = useContext(ImagenContext);

    const regresar = ()=>{
        guardarRegresar(true);
        guardarFoto({});
        guardarImagen({});
        guardarUbicacion({});
        guardarRetro({});
        guardarBase({});
        guardarNombre('');
        guardarErrorfoto(false);
        guardarErrormapa(false);
    }

    return ( 
        <div className="container center">
            <div className="card bg-light mt-5">
                <div className="card-body">
                    <h1>La imagen no fue reconocida</h1>
                    <p>Lo sentimos, intenta con otra imagen.</p>
                    <Link to="/">
                    <Button variant="contained" size="large" startIcon={<Replay/>} onClick={regresar}>Regresar</Button>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default ErrorResult;