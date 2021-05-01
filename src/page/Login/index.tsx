import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { LoginTemplate, SignupTemplate } from 'components/template';
import { bodyStyle } from './style';

const Login: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <div style={bodyStyle}>
      <Route exact path={`${path}/Signup`} component={SignupTemplate} />
      <Route exact path={`${path}`} component={LoginTemplate} />
      <Route exact path={`${path}/Admin/:Admin`} component={LoginTemplate} />
    </div>
  );
};

export default Login;
