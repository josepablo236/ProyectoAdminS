import React, {useState, useContext, useEffect, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/trip.svg';
import {ImagenContext} from '../../context/ImagenContext';
import Error from '../Error.js';
import axios from 'axios';

const Login = () => {
    //State de la auth que viene desde el context
    const { guardarUser, guardarLogin } = useContext(ImagenContext);


    //State del login
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })
    //State mensaje error
    const [mensaje, guardarMensaje] = useState("");
    //State para error
    const [error, guardarError] = useState(false);
    //State consulta
    const [consultar, guardarConsulta] = useState(false);
    //State satisfactorio
    const [exito, guardarExito] = useState(false);

    const {email, password} = usuario;

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit= e =>{
        e.preventDefault();
        //Validar campos vacios
        if(email.trim() === '' || password.trim() === '')
        {
            guardarMensaje("Todos los campos son obligatorios");
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarConsulta(true);
        
    }

    //Funcion llenar objeto
    const llenarObjeto = (datos) =>{
        guardarUser({
            correo: datos.email,
            nombre: datos.nombre
        })
    }
    //Llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url =`https://wp8zwjanmi.execute-api.us-east-2.amazonaws.com/dev/users?email=${usuario.email}`;
            let res = await axios.get(url);
            let data = res.data;
            if(data.body !=null)
            {
                //Convertir json a objeto
                let datos = JSON.parse(data.body);
                llenarObjeto(datos);
                let pass = String(datos.password);
                // Decrypt
                var CryptoJS = require("crypto-js");
                var bytes  = CryptoJS.AES.decrypt(pass, 'secret key 123');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                if(usuario.password === originalText)
                {
                    guardarExito(true);
                    guardarLogin(true);
                }
                else{
                    guardarMensaje("Contraseña incorrecta");
                    guardarError(true);
                    guardarConsulta(false);
                }
            }
            else{
                guardarMensaje("Usuario no encontrado");
                guardarError(true);
                guardarConsulta(false);
            }
        }
        if(consultar){
            consultarAPI();
        }
    }, [consultar])
    return ( 
        <Fragment>
            {
                !exito
                ?
                <div className="center mt-5">
                    <div className="contenedor-form">
                        <h1 className="text-center">Mis Vacaciones</h1>
                        <div className="center mb-4 mt-3">
                        <img src={logo} width="250px" className="center" alt="Icon"/>
                        </div>
                        {error ? <Error mensaje={mensaje}/> : null}
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Ingresa tu email"
                                    onChange={onChange}
                                    value={email}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu password"
                                    onChange={onChange}
                                    value={password}
                                />
                            </div>
                            <div className="campo-form">
                                <input type="submit" className="btn btn-primario btn-block"
                                    value="Iniciar Sesión"/>
                            </div>
                        </form>
                        <div className="center">
                            <div className="enlace-cuenta">
                            <Link to={'/'} className="enlaces-cuenta">Regresar</Link>
                            <Link to={'/nueva-cuenta'}>Crear cuenta</Link>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Redirect push to="/" />
            }
        </Fragment>
     );
}
 
export default Login;