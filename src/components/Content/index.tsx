import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import './style.css';
import Topbar from '../basis/TopBar';
import { ProductPage } from '../../page/index';

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
    <Switch>
      <Route exact path="/" component={(): any => 'Hello'} />
      <Route exact path="/about" component={(): any => 'About'} />
      <Route exact path="/Pages" component={(): any => 'Pages'} />
      <Route exact path="/faq" component={(): any => 'FAQ'} />
      <Route exact path="/contact" component={(): any => 'Contact'} />
      <Route exact path="/Home-1" component={(): any => 'Home-1'} />
      <Route exact path="/Home-2" component={(): any => 'Home-2'} />
      <Route exact path="/Home-3" component={(): any => 'Home-3'} />
      <Route exact path="/Product" component={ProductPage} />
      <Route exact path="/Page-2" component={(): any => 'Page-2'} />
      <Route exact path="/page-1" component={(): any => 'page-1'} />
      <Route exact path="/page-2" component={ProductPage} />
      <Route exact path="/page-3" component={(): any => 'page-3'} />
      <Route exact path="/page-4" component={(): any => 'page-4'} />
    </Switch>
  </Container>
);

export default Content;
