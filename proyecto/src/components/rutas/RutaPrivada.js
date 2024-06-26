import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    //State de la auth que viene desde el context
    const { login } = useContext(ImagenContext);
    return ( 
        <Route {...props } render={ props => !login 
        ? (
            <Redirect to="/"/>
        )
        :(
            <Component {...props}/>
        )}
        />
     );
}
 
export default RutaPrivada;