import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';
import {RegisterBusin} from '../index';

type TopBarProps = {
  toggleSidebar: VoidFunction;
};
const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <RegisterBusin classname="register" buttonLabel="사업자 등록"/>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/page-2">
              page 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/page-3">
              page 3
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/">
              로그아웃
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
