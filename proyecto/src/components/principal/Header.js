import React from 'react';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Image';

const Header = () => {
    return ( 
        <header className="fluid">
            <div className="container-sm contenedor">
                <h1 className="titulo">Mis próximas vacaciones</h1>
                <p className="subtitulo">Haz click para seleccionar una imagen</p>
                <Button variant="contained" size="large"startIcon={<UploadIcon />}>Cargar imagen</Button>
            </div>
        </header>
     );
}
 
export default Header;