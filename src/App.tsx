import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { SignupForm } from 'components/template';
import { Main, Login } from './page';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        {/* 임시 */}
        <Route exact path="/Login/Signup" component={SignupForm} />
        <Route path="/Main" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
