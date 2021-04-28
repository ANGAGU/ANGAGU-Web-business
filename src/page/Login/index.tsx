import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoginTemplate, SignupForm } from 'components/template';

const Login: React.FC = () => {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <>
      <Route exact path={`${path}/Signup`} component={SignupForm} />
      <Route exact path={`${path}`} component={LoginTemplate} />
    </>
  );
};

export default Login;
