import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import './style.css';
import Topbar from '../TopBar';
import { ProductPage, RegisterCompany } from '../../template';

type ContentProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: VoidFunction;
};

const Content = ({ sidebarIsOpen, toggleSidebar }: ContentProps) => (
  <Container
    fluid
    className={classNames('content', { 'is-open': sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <div id="content_container">
      <Switch>
        <Route exact path="/" component={(): any => 'Hello'} />
        <Route exact path="/Main/register" component={RegisterCompany} />
        <Route exact path="/Pages" component={(): any => 'Pages'} />
        <Route exact path="/faq" component={(): any => 'FAQ'} />
        <Route exact path="/contact" component={(): any => 'Contact'} />
        <Route exact path="/Home-1" component={(): any => 'Home-1'} />
        <Route exact path="/Home-2" component={(): any => 'Home-2'} />
        <Route exact path="/Home-3" component={(): any => 'Home-3'} />
        <Route exact path="/Main/Product" component={ProductPage} />
        <Route exact path="/Page-2" component={(): any => 'Page-2'} />
        <Route exact path="/page-1" component={(): any => 'page-1'} />
        <Route exact path="/page-2" component={ProductPage} />
        <Route exact path="/page-3" component={(): any => 'page-3'} />
        <Route exact path="/page-4" component={(): any => 'page-4'} />
      </Switch>
    </div>
  </Container>
);

export default Content;
