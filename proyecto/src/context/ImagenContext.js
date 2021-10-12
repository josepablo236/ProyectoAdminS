import React, {createContext, useState, useEffect} from 'react';

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
    const [info, guardarInfo] = useState({
        nombre: '',
        urlImagen: ''
    });

    //Consulta a la API
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
        else{
            console.log("Error");
        }
    }, [foto]);

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
            console.log(url,name);
            guardarInfo({
                nombre: name,
                urlImagen: url
            });
        }
    }
    return(
        <ImagenContext.Provider
            value={{
                foto,
                nombre,
                info,
                guardarFoto,
                guardarNombre,
                guardarCargar
            }}
        >
            {props.children}
        </ImagenContext.Provider>
    )
}
export default ImagenProvider;