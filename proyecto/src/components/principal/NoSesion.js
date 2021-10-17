import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/LockOpen';
import {Link} from 'react-router-dom';
import Login from '../auth/Login';

const NoSesion = () => {
    return ( 
        <Fragment>
            <p className="subtitulo">Haz click aqui para iniciar sesión:</p>
            <Link to="/login">
            <Button variant="contained" size="large" startIcon={<Lock/>}>Iniciar sesión</Button>
            </Link>
        </Fragment>
     );
}
 
export default NoSesion;