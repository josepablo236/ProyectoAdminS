import React, {useContext, useEffect} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import { evaluarTemperatura } from '../../helpers';

const Recomendaciones = () => {
    const { clima, errorclima } = useContext(ImagenContext);
    const {nombre, temp} = clima;

    let objeto = evaluarTemperatura(temp);

    const {estado, parrafo, prendas} = objeto;

    return ( 
        <div className="card bg-light mt-5">
            <div className="card-body">
                <h1>Recomendaciones</h1>
                <h3 className="class-Title">En {nombre} el clima está  {estado}</h3>
                <p className="card-text">{parrafo}</p>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Ver sugerencias de ropa
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        <ul className="list-group">
                            {prendas.map(prenda =>(
                                <li className="list-group-item list-group-item-secondary"
                                    key = {prenda}
                                >{prenda}</li>
                            ))}
                        </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Recomendaciones;