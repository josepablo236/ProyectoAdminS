import React, {useContext, useEffect, useState, Fragment, useRef} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import { evaluarTemperatura } from '../../helpers';
import axios from 'axios';
import { Print } from '@material-ui/icons';
import emailjs from 'emailjs-com';
//import { FacebookButton, FacebookCount } from "react-social";

const Form = () => {
    const { ubicacion, user, clima, retro, enviar, base, guardarBase, guardarEnviar } = useContext(ImagenContext);
    const resultadoInicial = " a ver";
    //State para enviar
    const [enviado, guardarEnviado] = useState(false);

    let objeto = evaluarTemperatura(clima.temp);
    //Funcion de enviar correo
    const enviarCorreo = e =>{
        e.preventDefault();
        //Lo que se almacenará en la base de datos
        guardarBase({
            email: user.correo,
            nombre: user.nombre,
            lugar: clima.nombre,
            lat: ubicacion.latitud,
            lng: ubicacion.longitud,
            direccion: ubicacion.direccion,
            clima: objeto.estado,
            temp: clima.temp,
            temp_max: clima.temp_max,
            temp_min: clima.temp_min,
            retro: retro
        });
        guardarEnviar(true);
        var resultado = `Hola ${user.nombre}, el resultado de tu busqueda fue: 
        Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
        Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
        ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`;
        console.log(resultado);

        guardarEnviado(true);
        emailjs.sendForm('service_MisProximas', 'template_MisProximas', form.current, 'user_VRWnWCPNstyie9BfagJ8v')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    }
    const form = useRef(null);
    //Meter el resultado a la base de datos
    useEffect(() => {
        const enviarDatos = async () =>{
            const url ='https://wp8zwjanmi.execute-api.us-east-2.amazonaws.com/dev/resultado';
            axios.post(url, base)
            .then(response =>{
                if(response.status === 200)
                {
                    console.log("Se guardó el resultado", base);
                }
                else{
                    console.log("No se pudo guardar el resultado");
                }
            })
        }
        if(enviar){
            enviarDatos();
            
        }
    }, [enviar]);
    return ( 
        <div className="container card mt-3 mb-5">
            {
                (!enviado)
                ?
                <Fragment>
                    <h2 className="text-center mt-3 mb-3 fs-4">Agrega tu correo para enviarte los resultados</h2>
                    <form ref={form}
                        onSubmit={enviarCorreo}
                        className="mb-3"
                    >
                        <div className = "row pt-5 mx-auto">
                            <div className = "col-8 form-group mx-auto">
                                <input type = "text" className="from-control" placeholder = "Name" name = "to_name" value = {user.nombre}/>
                            </div>
                            <div className = "col-8 form-group mx-auto">
                                <input type = "text" className="from-control" placeholder = "Email" name = "email"/>
                            </div>
                            <div className = "col-8 form-group mx-auto">
                                <input type = "text" className="from-control" placeholder = "Message" name = "message" value={`Hola ${user.nombre}, el resultado de tu busqueda fue: 
                                                 Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud} lng: ${ubicacion.longitud} 
                                                 Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
                                                 ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </div>
                    </form>
                </Fragment>
                :
                <h2 className="text-center mt-3 mb-3 fs-4">¡Te hemos enviado la información!</h2>
            }
        </div>
     );
}
 
export default Form;