import React, {createContext, useState, useEffect} from 'react';

//Crear context
export const AuthContext = createContext();

//Provider para funciones y state
const AuthProvider = (props) =>{
    //State usuario
    const [user, guardarUser] = useState({});
    //Login
    const [login, guardarLogin] = useState(false);

    return(
        <AuthContext.Provider
            value={{
                user,
                login,
                guardarUser,
                guardarLogin
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;