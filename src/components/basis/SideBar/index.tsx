/* eslint-disable prettier/prettier */
import React from 'react';
import { faQuestion, faImage } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'reactstrap';
import classNames from 'classnames';
import './style.css';
import { Fade } from 'react-awesome-reveal';
import { SideBarItem } from '../../molecules';
import logo from '../../../assets/images/angagu.png';

type SideBarProps = {
  isOpen: boolean;
  toggle: VoidFunction;
  menu: any;
};
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggle, menu }) => {
  return (
    <div className={classNames('sidebar', { 'is-open': isOpen })}>
      <Fade direction="right">
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
      </Fade>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <Fade cascade damping={0.1}>
            <br />
            {menu.map((item: any, idx: number) => (
              <SideBarItem key={`sidebar items ${idx}`} title={item.title} url={item.url} icon={item.icon} />
            ))}
            {/* <SideBarItem title={'Contact'} url={'/contact'} icon={faImage} /> */}
          </Fade>
        </Nav>
      </div>
      <footer>
        <ul>
          <li>회사소개</li>
          <li>개인정보보호정책</li>
          <li>위치</li>
          <li>
            <a href="tel:010-XXXX-XXXX">고객센터</a>
          </li>
        </ul>
        <address>주소: 서울특별시 마포구 아현동 백범로</address>
      </footer>
    </div>
  );
};
const imgStyle = {
  margin: '10px',
  width: '45px',
  backgroundColor: '#5f9d9f',
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

export default SideBar;
