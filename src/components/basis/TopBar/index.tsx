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

type TopBarProps = {
  toggleSidebar: VoidFunction;
};
const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const Logout= (e:any) => {
    window.localStorage.setItem('', "");
  }
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
            <NavLink tag={Link} to="/Main/register">
              사업자 등록 필요
            </NavLink>
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
            <Button onClick={Logout}>
              로그아웃
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
