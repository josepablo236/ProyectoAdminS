import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Principal from './components/principal/Principal';
import Foto from './components/principal/Foto';
import SubirDescarga from './components/principal/SubirDescarga';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Principal}/>
        <Route exact path="/tomar-foto" component={Foto}/>
        <Route exact path="/subir-descarga" component={SubirDescarga}/>
      </Switch>
    </Router>
  );
}

export default App;
