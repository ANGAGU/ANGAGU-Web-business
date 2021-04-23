import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './style.css';
import { SubMenu } from 'components';

type SideBarProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle }) => (
  <div className={classNames('sidebar', { 'is-open': isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: '#fff' }}>
        &times;
      </span>
      <h3>안가구</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Dummy Heading</p>
        <SubMenu title="Home" icon={faHome} items={submenus[0]} />
        <NavItem>
          <NavLink tag={Link} to={'/about'}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            About
          </NavLink>
        </NavItem>
        <SubMenu title="Pages" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={'/pages'}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'/faq'}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'/contact'}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Adjusts',
      target: '/Main/Adjust',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: 'Page 1',
      target: 'Page-1',
    },
    {
      title: 'Products',
      target: 'Products',
    },
  ],
];

export default SideBar;