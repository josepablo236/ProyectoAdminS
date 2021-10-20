export const evaluarTemperatura = (temp) =>{
    let estado;
    let parrafo;
    let prendas;
    let objeto;

    //Evaluar temp para recomendar

    if(temp >= 24.00){
        estado ='calido';
        parrafo= '¡Puede que haya calor! ¡Lleva ropa fresca!';
        prendas=["Pantalonetas", "Faldas", "Vestidos", "Shorts", "Prendas sin mangas", "Sandalias"];
    }
    else if(temp <= 10.00 && temp > 0.00){
        estado ='frio';
        parrafo= '¡Puede que haya un poco de frio! ¡Procura abrigarte!';
        prendas=["Chaquetas", "Gorros", "Bufandas", "Suéteres", "Jeans/Pants"];
    }
    else if(temp <= 0){
        estado ='bajo cero';
        parrafo= '¡Claramente estará muy frío! ¡Prepárate para abrigarte muy bien!';
        prendas=["Chumpas", "Gorros", "Guantes", "Conjuntos térmicos", "Bufandas", "Medias térmicas", "Gambones"];
    }
    else{
        estado ='templado';
        parrafo= '¡Ni frio ni calor! ¡Lleva tu ropa favorita!';
        prendas=["Jeans/Pants", "Camisas", "Playeras deportivas", "Shorts", "Vestidos", "Chaquetas"];
    }

    objeto = {
        estado: estado,
        parrafo: parrafo,
        prendas: prendas
    }

    return objeto;
}