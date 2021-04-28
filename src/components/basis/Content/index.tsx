import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './style.css';
import Topbar from '../TopBar';
import {
  ProductPage,
  RegisterCompany,
  ManageOrderTemplate,
  InfoTemplate
} from '../../template';

type ContentProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: VoidFunction;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
          <Route exact path={`${path}/Info`} component={InfoTemplate} />

        </Switch>
      </div>
    </Container>
  );
};

export default Content;
