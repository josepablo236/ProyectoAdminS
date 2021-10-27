import React, {useContext, useEffect, useState, Fragment, useRef} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import { evaluarTemperatura } from '../../helpers';
import axios from 'axios';
import emailjs from 'emailjs-com';
import Error from '../Error.js';
import { shareTextToWhatsApp } from 'share-text-to-whatsapp';
import {FacebookShareButton, FacebookIcon, TwitterShareButton,  TwitterIcon, WhatsappShareButton,  WhatsappIcon } from "react-share";

const Form = () => {
    const { ubicacion, user, clima, retro, base, guardarBase } = useContext(ImagenContext);
    //State para enviar
    const [enviado, guardarEnviado] = useState(false);
    const [exito, guardarExito] = useState(true);
    //State para error
    const [error, guardarError] = useState(false);
    //State mensaje error
    const [mensaje, guardarMensaje] = useState("");
    //State del form
    const [formulario, guardarFormulario] = useState({
        email: ''
    });
    //En lo que se consigue el link de la pagina
    const url = "https://misproximasvacaciones.netlify.app/";
    const {email} = formulario;

    let objeto = evaluarTemperatura(clima.temp);

    const onChange = e =>{
        guardarFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    //Funcion de enviar correo
    const enviarCorreo = e =>{
        e.preventDefault();

        if(email.trim() === ''){
            guardarMensaje("Se requiere un correo válido");
            guardarError(true);
            return;
        }
        guardarError(false);

        //Lo que se almacenará en la base de datos
        guardarBase({
            email: user.correo,
            nombre: user.nombre,
            lugar: clima.nombre,
            lat: ubicacion.latitud.toString(),
            lng: ubicacion.longitud.toString(),
            direccion: ubicacion.direccion,
            clima: objeto.estado,
            temp: clima.temp,
            temp_max: clima.temp_max,
            temp_min: clima.temp_min,
            retro: retro
        });
        guardarEnviado(true);

        emailjs.sendForm('service_MisProximas', 'template_MisProximas', form.current, 'user_VRWnWCPNstyie9BfagJ8v')
          .then((result) => {
                guardarExito(true);
          }, (error) => {
                guardarExito(false);
          });
    }

    //funcion para enviar de nuevo
    const volverEnviar = e =>{
        e.preventDefault();
        guardarEnviado(false);
        guardarFormulario({
            email: ''
        });
        guardarExito(true);
    }

    const form = useRef(null);

    //Meter el resultado a la base de datos
    useEffect(() => {
        const enviarDatos = async () =>{
            const url ='https://wp8zwjanmi.execute-api.us-east-2.amazonaws.com/dev/resultado';
            axios.post(url, base);
        }
        if(enviado){
            enviarDatos();
        }
    }, [enviado]);

    return ( 
        <div className="container card mt-3 mb-5">
            {
                (!enviado)
                ?
                <Fragment>
                    <h2 className="text-center mt-3 mb-3 mt-4 fs-4">Agrega tu correo para enviarte los resultados</h2>
                    {error ? <Error mensaje={mensaje}/> : null}
                    <form ref={form}
                        onSubmit={enviarCorreo}
                        className="mb-3"
                    >
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-md-2 col-form-label">Nombre</label>
                            <div className="col-sm-6 col-md-10">
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" name = "to_name" value={user.nombre}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputEmail" className="col-md-2 col-form-label">Email</label>
                            <div className="col-sm-6 col-md-10">
                            <input type="text" className="form-control" name = "email" onChange={onChange} value={email}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-md-2 col-form-label">Mensaje</label>
                            <div className="col-sm-6 col-md-10">
                            <textarea type="text" rows="10" cols="50" readOnly className="form-control-plaintext" id="staticEmail" name = "message" 
                            value={`Hola ${user.nombre}, el resultado de tu busqueda fue: 
Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
${objeto.parrafo} Prendas para usar: ${objeto.prendas}`}>
                            </textarea>
                            </div>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto mb-3">
                            <button type="submit" className="btn btn-primary">Enviar correo</button>
                        </div>
                    </form>
                </Fragment>
                :
                exito
                ?
                <h2 className="text-center mt-3 mb-3 fs-4">¡Te hemos enviado la información!</h2>
                :
                <Fragment>
                    <h2 className="text-center mt-3 mb-3 fs-4">Ocurrió un error al enviar el correo</h2>
                    <form className="center mb-3" onSubmit={volverEnviar}>
                    <button type="submit" className="btn btn-primary">Probar otro correo</button>
                    </form>
                </Fragment>
            }
            <div className="center mb-3">
                <p>¡Comparte en tus redes sociales!</p>
            </div>
            <div className="center mb-4">
                <FacebookShareButton url = {url} 
                quote = {
                    `Hola ${user.nombre}, el resultado de tu busqueda fue: 
                    Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
                    Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
                    ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`
                }
                >
                    <FacebookIcon round= {true}></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url = {url} 
                via = {
                    `Hola ${user.nombre}, el resultado de tu busqueda fue: 
                    Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
                    Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
                    ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`
                }
                >
                    <TwitterIcon round= {true}></TwitterIcon>
                </TwitterShareButton>
                <WhatsappShareButton 
                url = {
                    `Hola ${user.nombre}, el resultado de tu busqueda fue: 
                    Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
                    Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
                    ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`
                } 
                >
                    <WhatsappIcon round= {true}></WhatsappIcon>
                </WhatsappShareButton>
            </div>
        </div>
     );
}
 
export default Form;