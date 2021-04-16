import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Main, Login, ProductPage, ProductDetail } from './page';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Main} />
        <Route exact path="/Product" component={ProductPage} />
        <Route exact path="/Product/1" component={ProductDetail} />
      </Switch>
    </Router>
  );
};

export default App;
