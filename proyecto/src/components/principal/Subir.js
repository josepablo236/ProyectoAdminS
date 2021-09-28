import React, {useState, Fragment} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

const Subir = () => {

    //State del archivo
    const [file, setfile] = useState(null);
    //State del nombre del archivo
    const [nombre, setNombre] = useState('');
    //State para mostrar la imagen y botón de subir
    const [mostrarboton,setmostrarboton] = useState(false);

    //Funcion que se ejecuta al dar click en el botón para tomar foto
    const tomarFoto = ()=>{
        console.log("Tomar foto");
    }

    //Funcion que se ejecuta al da click en cancelar
    const cancelar = ()=>{
        setfile(null);
        setmostrarboton(false);
    }

    //Funcion que se ejecuta al seleccionar un archivo
    const archivoSeleccionado = e =>{
        setfile(e.target.files[0]);
        setNombre(e.target.files[0].name);
        setmostrarboton(true);
    }

    //Funcion para enviar la foto
    const enviarFoto = () =>{
        console.log(file);
    }
    return ( 
        <Stack direction="row" alignItems="center" spacing={2}>
            
            {
                !mostrarboton
                ?
                <Fragment>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={archivoSeleccionado}/>
                        <Button variant="contained" component="span">
                        Seleccionar
                        </Button>
                    </label>
                    <Button variant="contained" component="span" onClick = {tomarFoto} to={'/nueva-cuenta'} >
                        Tomar foto
                    </Button>
                </Fragment>
                :
                <Fragment>
                    <Button variant="contained" component="span" onClick = {enviarFoto}>
                        Enviar foto
                    </Button>
                    <Button variant="contained" component="span" onClick = {cancelar}>
                        Cancelar
                    </Button>
                </Fragment>
            }
        </Stack>
     );
}
 
export default Subir;