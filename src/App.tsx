import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Main, Login, ProductPage } from './page';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Home" component={Main} />
        <Route path="/Products" component={ProductPage} />
      </Switch>
    </Router>
  );
};

export default App;
