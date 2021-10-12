import { Fragment, useState } from "react";
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Back from '@material-ui/icons/ArrowBack';
import Cancel from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom';

const SubirDescarga= () =>{

    //State para la imagen subida
    const [imagen, guardarImagen] = useState({});
    //State para ver si existe una imagen
    const [subida, guardarSubida] = useState(false);

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeImage = (e) => {
    guardarImagen(e.target.files[0]);
    guardarSubida(true);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };

  const enviarFoto = () =>{
    console.log(imagen);
  }

  const cancelar = () =>{
    guardarImagen(null);
    guardarSubida(false);
  }

  return (
    <div>
        <br />
        {
            !subida
            ?
            <Fragment>
                <div className="image-upload-wrap">
                    <input
                        className="file-upload-input"
                        type="file"
                        accept="image/"
                        multiple
                        onChange={(e) => {
                        changeImage(e);
                        }}
                    />
                    <div className="text-information">
                        <h3>Arrastra o selecciona la imagen descargada</h3>
                    </div>
                </div>
                <div className="center mt-3">
                    <Link to="/tomar-foto">
                    <Button variant="contained" size="large" startIcon={<Back/>}>Regresar</Button>
                    </Link>
                </div>
            </Fragment>
            :
            <Fragment>
                <div className="center">
                    <img
                    src={ImageSelectedPrevious}
                    alt=""
                    height="480px"
                    width="640px"
                    />
                </div>
                <div className="container mt-3 center">
                  <Link to="/resultado">
                    <Button variant="contained" component="span" onClick = {enviarFoto} endIcon={<Send/>}>
                            Enviar foto
                    </Button>
                    </Link>
                    <Button variant="contained" component="span" onClick = {cancelar} endIcon={<Cancel/>}>
                            Cancelar
                    </Button>
                </div>
            </Fragment>
        }
    </div>
  );
}

export default SubirDescarga;
