import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './style.css';
import Topbar from '../TopBar';
import {
  ProductPageTemplate,
  RegisterCompanyTemplate,
  ManageOrderTemplate,
  InfoTemplate,
  AdjustPageTemplate,
  ProductDetailTemplate,
  ManageProductTemplate,
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
    <Container fluid className={classNames('content', { 'is-open': sidebarIsOpen })}>
      <div id="content_container">
        <Switch>
          <Route exact path={`${path}/Register`} component={RegisterCompanyTemplate} />
          <Route exact path={`${path}/Product`} component={ProductPageTemplate} />
          <Route exact path={`${path}/Product/:id`} component={ProductDetailTemplate} />
          <Route exact path={`${path}/Register`} component={RegisterCompanyTemplate} />
          <Route exact path={`${path}/ManageOrder`} component={ManageOrderTemplate} />
          <Route exact path={`${path}/Info`} component={InfoTemplate} />
          <Route exact path={`${path}/Adjust`} component={AdjustPageTemplate} />
          <Route exact path={`${path}/ManageProduct`} component={ManageProductTemplate} />
        </Switch>
      </div>
    </Container>
  );
};

export default Content;
