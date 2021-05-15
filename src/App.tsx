import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Main, Login } from './page';
import { LoginTemplate } from './components/template';

import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  const token = localStorage.getItem('token');

  console.log('app', isAdmin);
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Main" component={Main} />
        <Route exact path={`/Admin/:Admin`} component={LoginTemplate} />
        {/* 로그인 정보에 따라 redirect 분기 */}
        <Route
          path="/"
          render={() =>
            token !== null ? (
              <Redirect
                to={{
                  pathname: '/Main',
                }}
              />
            ) : (
              <Redirect
                to={{
                  pathname: '/Login',
                }}
              />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
