import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';

type SideBarItemProps = {
  url: string;
  title: string;
  icon: any;
};
const SideBarItem: React.FC<SideBarItemProps> = ({ url, title, icon }) => {
  return (
    <NavItem>
      <NavLink
        tag={Link}
        to={url}
        style={window.location.pathname === url ? SelectedItemStyle : notSelectedItemStyle}
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </NavLink>
    </NavItem>
  );
};
const SelectedItemStyle = {
  background: 'cadetblue',
};
const notSelectedItemStyle = {
  background: '#222929',
};
export default SideBarItem;
