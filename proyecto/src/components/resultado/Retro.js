import React, {Fragment, useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Like from '@material-ui/icons/ThumbUp';
import Medium from '@material-ui/icons/ThumbsUpDown';
import Dislike from '@material-ui/icons/ThumbDown';
import {ImagenContext} from '../../context/ImagenContext';
const Retro = () => {

    //State de la imagen que viene desde el context
    const { guardarRetro, errorclima } = useContext(ImagenContext);

    //State para mensaje
    const [mensaje, guardarMensaje] = useState(false);
    const like = ()=>{
        guardarMensaje(true);
        guardarRetro('Like');
    }
    const medium = ()=>{
        guardarMensaje(true);
        guardarRetro('Medium');
    }
    const dislike = ()=>{
        guardarMensaje(true);
        guardarRetro('Dislike');
    }
    return ( 
        <Fragment>
            {
                (!errorclima)
                ?
                <Fragment>
                    <div className="center mt-5">
                        <h1 className="text-center">¿Qué tal te pareció nuestro servicio?</h1>
                    </div>
                    {
                        mensaje
                        ?
                        <div className="center mt-4">
                            <h2 className="text-center">¡Gracias por tu retroalimentación!</h2>
                        </div>
                        :
                        <div className="container center mt-4">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" size="large" startIcon={<Like />} onClick={like}>
                                    Like
                                </Button>
                                <Button variant="outlined" size="large" startIcon={<Medium />} onClick={medium}>
                                    Medium
                                </Button>
                                <Button variant="contained" size="large" startIcon={<Dislike />} onClick={dislike}>
                                    Dislike
                                </Button>
                            </Stack>
                        </div>
                    }
                </Fragment>
                :
                null
            }
        </Fragment>
     );
}
 
export default Retro;