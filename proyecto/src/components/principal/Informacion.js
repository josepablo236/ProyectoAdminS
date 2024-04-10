import React from 'react';
import avion from '../../img/avion.jpg';
import lago from '../../img/lago.jpg';
import playa from '../../img/playa.jpeg';

const Informacion = () => {
    return (  
        <div className="container mb-5">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={playa} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿Pensando en descansar?</h1>
                            <p className="card-text">Muestranos tu lugar ideal para viajar y lo buscaremos para ti.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={avion} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿No sabes en donde queda?</h1>
                            <p className="card-text">Te mostramos la ubicación exacta para que viajes a tu lugar de destino.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={lago} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿No sabes qué ropa llevar?</h1>
                            <p className="card-text">Te recomendamos ropa adecuada según el clima de tu destino.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}
 
export default Informacion;