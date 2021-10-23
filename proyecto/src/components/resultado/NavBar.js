import React, {useContext} from 'react';
import logo from '../../img/trip.svg';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Return from '@material-ui/icons/ArrowBack';
import {ImagenContext} from '../../context/ImagenContext';
const NavBar = () => {
    //State de la imagen que viene desde el context
    const { guardarLogin, guardarRegresar, guardarFoto, guardarUbicacion, guardarRetro, guardarBase, guardarNombre } = useContext(ImagenContext);

    const cerrarSesion = ()=>{
        guardarLogin(false);
        guardarFoto({});
        guardarUbicacion({});
        guardarRetro({});
        guardarBase({});
        guardarRegresar(false);
        guardarNombre('');
    }

    const regresar = ()=>{
        guardarRegresar(true);
        guardarFoto({});
        guardarUbicacion({});
        guardarRetro({});
        guardarBase({});
        guardarNombre('');
    }

    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/">
                    <Button variant="contained" size="small" startIcon={<Return/>} onClick={regresar}></Button>
                </Link>
                <a className="navbar-brand center">
                <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                Mis próximas vacaciones
                </a>
                <form className="d-flex" onSubmit={cerrarSesion}>
                    <Link to="/">
                    <button className="btn btn-secundario" type="submit" onClick={cerrarSesion}>Cerrar sesión</button>
                    </Link>
                </form>
            </div>
        </nav>
     );
}
 
export default NavBar;