import React from 'react';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Image';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Subir from './Subir';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Header = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return ( 
        <header className="fluid">
            <div className="container-sm contenedor">
                <h1 className="titulo">Mis próximas vacaciones</h1>
                <p className="subtitulo">Haz click para seleccionar una imagen</p>
                <Button variant="contained" size="large"  onClick={handleOpen}>Cargar imagen</Button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="row">
                        <h2>
                        Cargar Imagen
                        </h2>
                        <p>
                        Selecciona una imagen o toma una foto
                        </p>
                        <Subir/>
                        </div>
                    </Box>
                </Modal>
            </div>
        </header>
     );
}
 
export default Header;