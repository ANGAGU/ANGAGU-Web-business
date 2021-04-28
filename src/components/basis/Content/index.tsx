import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import './style.css';
import Topbar from '../TopBar';
import {
  ProductPage,
  RegisterCompany,
  ManageOrderTemplate,
} from '../../template';

type ContentProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: VoidFunction;
};

const Content = ({ sidebarIsOpen, toggleSidebar }: ContentProps) => {
  const { path } = useRouteMatch(); // 요청시의 path?
  console.log('path : ', path);
  return (
    <Container
      fluid
      className={classNames('content', { 'is-open': sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <div id="content_container">
        <Switch>
          <Route exact path={`${path}/Register`} component={RegisterCompany} />
          <Route
            exact
            path={`${path}/ManageOrder`}
            component={ManageOrderTemplate}
          />
          <Route exact path={`${path}/Product`} component={ProductPage} />
        </Switch>
      </div>
    </Container>
  );
};

export default Content;
