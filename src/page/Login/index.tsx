import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoginTemplate, SignupTemplate } from 'components/template';

const Login: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Route exact path={`${path}/Signup`} component={SignupTemplate} />
      <Route exact path={`${path}`} component={LoginTemplate} />
      <Route exact path={`${path}/:Admin`} component={LoginTemplate} />
    </>
  );
};

export default Login;
