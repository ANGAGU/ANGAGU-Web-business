import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from './api/index';
import './App.css';
import { Main, Login, ProductPage } from './page';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const test = async () => {
    const result = await api.get('/customer/products', {});
    if (result.status === 'success') {
      console.log(result.data);
    }
  };
  test();
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
