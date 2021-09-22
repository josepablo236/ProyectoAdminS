import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Principal from './components/principal/Principal';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Principal}/>
      </Switch>
    </Router>
  );
}

export default App;
