import React, { useState, useEffect } from 'react';
import { faBriefcase, faPaperPlane, faHouseUser, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { SideBar, Content, TopBar } from '../../components';
import './style.css';

const companyComponent = [
  { title: '상품관리', url: '/Main/Product', icon: { faHouseUser } },
  { title: '기업정보', url: '/Main/Info', icon: { faChartPie } },
  { title: '상품상세', url: '/Main/Product/:id', icon: { faPaperPlane } },
  { title: '정산관리', url: '/Main/Adjust', icon: { faBriefcase } },
];
const adminComponent = [
  { title: '상품관리', url: '/Main/ManageProduct', icon: { faHouseUser } },
  { title: '상품상세', url: '/Main/Product/:id', icon: { faPaperPlane } },
];

const Main: React.FC = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState('');
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  useEffect(() => {
    const localAdmin = localStorage.getItem('isAdmin');
    if (localAdmin !== null) setIsAdmin(localAdmin);
  }, []);
  return isAdmin === '' ? (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} menu={companyComponent} />
      <div className="flex_vertical">
        <TopBar toggleSidebar={toggleSidebar} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </div>
  ) : (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} menu={adminComponent} />
      <div className="flex_vertical">
        <TopBar toggleSidebar={toggleSidebar} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </div>
  );
};

export default Main;
