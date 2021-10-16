import React, {useContext, useState} from 'react';
import {ImagenContext} from '../../context/ImagenContext';

const Recomendaciones = () => {
    const { clima, errorclima } = useContext(ImagenContext);
    const {nombre, temp} = clima;

    let estado;
    let parrafo;
    let prendas;

    //Evaluar temp para recomendar
    if(temp >= 24.00){
        estado ='calido';
        parrafo= '¡Puede que haya calor! ¡Lleva ropa fresca!';
        prendas=["Pantalonetas", "Faldas", "Vestidos", "Shorts", "Prendas sin mangas", "Sandalias"];
    }
    else if(temp <= 10.00){
        estado ='frio';
        parrafo= '¡Puede que haya un poco de frio! ¡Procura abrigarte!';
        prendas=["Chaquetas", "Gorros", "Bufandas", "Suéteres", "Jeans/Pants"];
    }
    else if(temp < 0){
        estado ='bajo cero';
        parrafo= '¡Claramente estará muy frío! ¡Prepárate para abrigarte muy bien!';
        prendas=["Chumpas", "Gorros", "Guantes", "Conjuntos térmicos", "Bufandas", "Medias térmicas", "Gambones"];
    }
    else{
        estado ='templado';
        parrafo= '¡Ni frio ni calor! ¡Lleva tu ropa favorita!';
        prendas=["Jeans/Pants", "Camisas", "Playeras deportivas", "Shorts", "Vestidos", "Chaquetas"];
    }

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