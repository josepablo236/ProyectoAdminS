import React, {useContext, Fragment} from 'react';
import logo from '../../img/trip.svg';
import {Link} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const NavBarP = () => {
    //State de la imagen que viene desde el context
    const { login, guardarLogin, guardarImagen, guardarRegresar, guardarFoto, guardarUbicacion, guardarRetro, guardarBase, guardarNombre, guardarErrormapa, guardarErrorfoto } = useContext(ImagenContext);

    const cerrarSesion = ()=>{
        guardarLogin(false);
        guardarFoto({});
        guardarImagen({});
        guardarUbicacion({});
        guardarRetro({});
        guardarBase({});
        guardarRegresar(false);
        guardarNombre('');
        guardarErrorfoto(false);
        guardarErrormapa(false);
    }
    return ( 
        <Fragment>
            {
                login 
                ?
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand">
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
                :
                null
            }
        </Fragment>
     );
}
 
export default NavBarP;