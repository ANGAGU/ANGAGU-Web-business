/* eslint-disable prettier/prettier */
import React from 'react';
import { faQuestion, faImage } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import './style.css';
import { SideBarItem } from '../../molecules';
import logo from '../../../assets/images/angagu.png';

const imgStyle = {
  margin: '10px',
  width: '45px',
};
const titleStyle = {
  color: 'white',
  fontSize: 'xx-large',
  margin: '0px',
  fontFamily: 'Roboto',
};
const titleDivStyle = {
  display: 'flex',
  alignItems: 'center',
};
const sidebarHeaderStyle = {
  display: 'flex',
};
type SideBarProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  menu: any;
};
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle, menu }) => {
  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className="sidebar-header" style={sidebarHeaderStyle}>
        <span color="info" onClick={toggle} style={{ color: '#fff' }}>
          &times;
        </span>
        <a href="/Main">
          <img src={logo} alt="안가구 로고" style={imgStyle} />
        </a>
        <div style={titleDivStyle}>
          <p style={titleStyle}>ANGAGU</p>
        </div>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <br />
          {menu.map((item: any, idx: number) => (
            <SideBarItem key={`sidebar items ${idx}`} title={item.title} url={item.url} icon={item.icon} />
          ))}
          <SideBarItem title={'FAQ'} url={'/faq'} icon={faQuestion} />
          <SideBarItem title={'Contact'} url={'/contact'} icon={faImage} />
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
