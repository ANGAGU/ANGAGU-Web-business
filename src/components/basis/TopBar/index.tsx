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
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import './style.css';
import TopBarLibs from './libs';

const NavBarStyle = {
  height: '65px',
  background: '#232929',
};
const ButtonStyle = {
  background: 'black',
  borderColor: '#1c5c59',
};
type TopBarProps = {
  toggleSidebar: VoidFunction;
};
const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const history = useHistory();
  const Logout = (e: any) => {
    if (localStorage.getItem('isAdmin')) {
      // 관리자이면
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
    } else {
      // 관리자 아니면
      localStorage.removeItem('token');
    }
    history.push('/');
  };
  const { path } = useRouteMatch();
  return (
    <Navbar className="navbar shadow-sm p-3   " expand="md" style={NavBarStyle}>
      <Button color="info" style={ButtonStyle} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={`${path}/Register`}>
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
            <Button onClick={(e)=>{TopBarLibs.Logout(e, history)}}>로그아웃</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
