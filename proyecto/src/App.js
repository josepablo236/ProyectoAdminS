import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Principal from './components/principal/Principal';
import Foto from './components/principal/Foto';
import SubirDescarga from './components/principal/SubirDescarga';
import Resultado from './components/resultado/Resultado';
import ImagenProvider from './context/ImagenContext';
import Login from './components/auth/Login.js';
import NuevaCuenta from './components/auth/NuevaCuenta';

function App() {
  return (
    <ImagenProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Principal}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
          <Route exact path="/tomar-foto" component={Foto}/>
          <Route exact path="/subir-descarga" component={SubirDescarga}/>
          <Route exact path="/resultado" component={Resultado}/>
        </Switch>
      </Router>
    </ImagenProvider>
  );
}

export default App;
