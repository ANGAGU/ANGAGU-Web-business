import './App.css';
import React, {useState} from 'react';
import {Login} from './page';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
