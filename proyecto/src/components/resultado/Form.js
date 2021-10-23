import React, {useContext, useEffect, useState, Fragment} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import { evaluarTemperatura } from '../../helpers';
import axios from 'axios';
const Form = () => {
    const { ubicacion, user, clima, errorclima, retro, base, guardarBase} = useContext(ImagenContext);

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
            lat: ubicacion.latitud.toString(),
            lng: ubicacion.longitud.toString(),
            direccion: ubicacion.direccion,
            clima: objeto.estado,
            temp: clima.temp,
            temp_max: clima.temp_max,
            temp_min: clima.temp_min,
            retro: retro
        });
        var resultado = `Hola ${user.nombre}, el resultado de tu busqueda fue: 
        Lugar: ${clima.nombre}, Ubicación: lat: ${ubicacion.latitud.toString()} lng: ${ubicacion.longitud.toString()} 
        Clima: ${objeto.estado} Temperatura: ${clima.temp} Temperatura Max: ${clima.temp_max} Temperatura min: ${clima.temp_min} 
        ${objeto.parrafo} Prendas para usar: ${objeto.prendas}`;
        console.log(resultado);
        guardarEnviado(true);
    }
    //Meter el resultado a la base de datos
    useEffect(() => {
        const enviarDatos = async () =>{
            const url ='https://wp8zwjanmi.execute-api.us-east-2.amazonaws.com/dev/resultado';
            axios.post(url, base)
            .then(response =>{
                if(response.status === 200)
                {
                    console.log("Se guardó el resultado", base);
                    console.log(response);
                }
                else{
                    console.log("No se pudo guardar el resultado");
                }
            })
        }
        if(enviado){
            enviarDatos();
        }
    }, [enviado]);
    return ( 
        <Fragment>
            {
                (!errorclima)
                ?
                    <div className="container card mt-3 mb-5">
                        {
                            (!enviado)
                            ?
                            <Fragment>
                                <h2 className="text-center mt-3 mb-3 fs-4">Agrega tu correo para enviarte los resultados</h2>
                                <form
                                    onSubmit={enviarCorreo}
                                    className="mb-3"
                                >
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                        <input type="email" className="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </form>
                            </Fragment>
                            :
                            <h2 className="text-center mt-3 mb-3 fs-4">¡Te hemos enviado la información!</h2>
                        }
                    </div>
                :
                    null
            }
        </Fragment>
     );
}
 
export default Form;