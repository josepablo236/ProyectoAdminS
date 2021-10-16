import React from 'react';
const Form = () => {
    //Funcion de enviar correo
    const enviarCorreo = e =>{
        e.preventDefault();
    }
    return ( 
        <div className="container card mt-3 mb-5">
            <h2 className="text-center mt-3 mb-3 fs-4">Agrega tu correo para enviarte los resultados</h2>
            <form
                onSubmit={enviarCorreo}
                className="mb-3"
            >
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
     );
}
 
export default Form;