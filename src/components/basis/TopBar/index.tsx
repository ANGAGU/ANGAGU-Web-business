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
import TopBarLibs from './libs';
import { NavBarStyle, ButtonStyle, ButtonMargin } from './style';

type TopBarProps = {
  toggleSidebar: VoidFunction;
};

const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const history = useHistory();
  const { path } = useRouteMatch();
  return (
    <Navbar className="navbar shadow-sm p-3   " expand="md" style={NavBarStyle}>
      <Button color="info" style={ButtonStyle} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <Button
            outline
            color="secondary"
            onClick={e => {
              TopBarLibs.goToRegister(history, `${path}/Register`);
            }}
            style={ButtonMargin}
          >
            사업자 등록 필요
          </Button>{' '}
          <Button
            outline
            color="secondary"
            onClick={e => {
              TopBarLibs.Logout(e, history);
            }}
          >
            로그아웃
          </Button>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
