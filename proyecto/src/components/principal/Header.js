import React, {Fragment, useContext} from 'react';
import Sesion from './Sesion';
import {AuthContext} from '../../context/AuthContext';
import NoSesion from './NoSesion';

const Header = () => {
    //State de la auth que viene desde el context
    const { login } = useContext(AuthContext);
    return ( 
        <header className="fluid">
            <div className="container-sm contenedor">
                <h1 className="titulo">Mis próximas vacaciones</h1>
                {
                    (login)
                    ?
                        <Sesion/>
                    :
                        <NoSesion/>
                }
            </div>
        </header>
     );
}
 
export default Header;