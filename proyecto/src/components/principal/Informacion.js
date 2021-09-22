import React from 'react';
import avion from '../../img/avion.jpg';
import lago from '../../img/lago.jpg';
import playa from '../../img/playa.jpeg';

const Informacion = () => {
    return (  
        <div class="container mb-5">
            <div class="row">
                <div class="col-sm-6 col-md-4">
                    <div className="card">
                        <img src={playa} class="card-img-top" alt="..." width="100px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿Pensando en descansar?</h1>
                            <p className="card-text">Muestranos tu lugar ideal para viajar y lo buscaremos para ti.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div className="card">
                        <img src={avion} class="card-img-top" alt="..." height="200px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿No sabes en donde queda?</h1>
                            <p className="card-text">Te mostramos la ubicación exacta para que viajes a tu lugar de destino.</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div className="card">
                        <img src={lago} class="card-img-top" alt="..." height="200px"/>
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