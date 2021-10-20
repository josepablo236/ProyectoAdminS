import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Crear context
export const ImagenContext = createContext();

//Provider para funciones y state
const ImagenProvider = (props) =>{
    //State de la imagen
    const [foto, guardarFoto] = useState({});
    //State cargar API
    const [cargar, guardarCargar] = useState(false);
    //State nombre de la imagen
    const [nombre, guardarNombre] = useState('');
    //State info de la imagen
    const [imagen, guardarImagen] = useState({
        nombre: '',
        urlImagen: ''
    });
    //State del resultado final
    const [ubicacion, guardarUbicacion] = useState({
        latitud: '',
        longitud: '',
        direccion: ''
    });
    //State del clima
    const [clima, guardarClima] = useState({});
    //State error clima
    const [errorclima, guardarErrorclima] = useState(false);
    //State retroalimentación
    const [retro, guardarRetro] = useState('');

    //State usuario
    const [user, guardarUser] = useState({});
    //Login
    const [login, guardarLogin] = useState(false);

    //State para enviar datos a la base
    const [enviar, guardarEnviar] = useState(false);

    //State del resultado
    //Necesito: imagen, ubicacion, login, clima, retro
    const [base, guardarBase] = useState({
        email: '',
        nombre: '',
        lugar: '',
        lat: '',
        lng: '',
        direccion: '',
        clima: '',
        temp: '',
        temp_max: '',
        temp_min: '',
        reco: '',
        prendas: [],
        retro: ''
    });

    //Consulta a la API azure
    useEffect(() => {
        if(cargar){
            const obtenerInfo = async() => {
                var baseUri = `https://api.bing.microsoft.com/v7.0/images/visualsearch`;
                var key = 'd13dc019d13d474dacf1ea05426fa9e2';
                var form = new FormData();
                form.append("image", foto);
    
                var request = new XMLHttpRequest();
    
                request.open("POST", baseUri);
                request.setRequestHeader('Ocp-Apim-Subscription-Key', key);
                request.addEventListener('load', handleResponse);
                request.send(form);
            }
            obtenerInfo();
        }
    }, [foto]);

    //Respuesta de la API azure
    function handleResponse() {
        if(this.status !== 200){
            alert("Error calling Bing Visual Search. See console log for details.");
            return;
        }
        else{
            var tags = JSON.parse(this.responseText);
            console.log(tags);
            var url = String(tags.tags[1].image.thumbnailUrl);
            var name = tags.tags[1].displayName;
            guardarImagen({
                nombre: name,
                urlImagen: url
            });
        }
    }

    //API de openweather
    useEffect(() =>{
        const consultarAPI = async () =>{
          if(ubicacion.latitud){
            const appID = '5e351571f5b81988a99f2ff69f9ee7dd';
            //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5e351571f5b81988a99f2ff69f9ee7dd
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.latitud}&lon=${ubicacion.longitud}&appid=${appID}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            //Detectar si hay error
            if(resultado.cod === "404"){
                guardarErrorclima(true);
            }
            else{
                guardarErrorclima(false);
                //Grados kelvin
                const kelvin = 273.15;
                guardarClima({
                    nombre: imagen.nombre,
                    temp: parseFloat(resultado.main.temp - kelvin, 10).toFixed(2),
                    temp_max: parseFloat(resultado.main.temp_max - kelvin, 10).toFixed(2),
                    temp_min: parseFloat(resultado.main.temp_min - kelvin, 10).toFixed(2)
                });
            }
          }
        }
        consultarAPI();
      },[ubicacion]);

    return(
        <ImagenContext.Provider
            value={{
                foto,
                nombre,
                imagen,
                ubicacion,
                clima,
                errorclima,
                retro,
                user,
                login,
                base,
                enviar,
                guardarFoto,
                guardarNombre,
                guardarCargar,
                guardarUbicacion,
                guardarRetro,
                guardarUser,
                guardarLogin,
                guardarBase,
                guardarEnviar
            }}
        >
            {props.children}
        </ImagenContext.Provider>
    )
}
export default ImagenProvider;