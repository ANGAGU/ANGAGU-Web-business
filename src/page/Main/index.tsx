import React, { useState, useEffect } from 'react';
import {
  faBriefcase,
  faPaperPlane,
  faHouseUser,
  faChartPie,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { SideBar, Content, TopBar } from '../../components';
import api from '../../api';
import './style.css';

const companyComponent = [
  { title: '홈', url: '/Main', icon: faHouseUser },
  { title: '기업정보', url: '/Main/Info', icon: faChartPie },
  { title: '상품관리', url: '/Main/Product', icon: faPaperPlane },
  { title: '상품문의', url: '/Main/QnA', icon: faQuestion },
  { title: '상품상세', url: '/Main/Product/:id', icon: faPaperPlane },
  { title: '정산관리', url: '/Main/Adjust', icon: faBriefcase },
  { title: '주문관리', url: '/Main/ManageOrder', icon: faChartPie },
];
const adminComponent = [
  { title: 'ADMIN 상품관리', url: '/Main/ManageProduct', icon: faHouseUser },
  { title: 'ADMIN 정산관리', url: '/Main/ManageAdjust', icon: faBriefcase },
  // { title: 'AMDIN 상품상세', url: '/Main/Product/:id', icon: faPaperPlane },
];

const Main: React.FC = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState<any>(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const history = useHistory();

  useEffect(() => {
    const localAdmin = localStorage.getItem('isAdmin');
    if (localAdmin !== null) setIsAdmin(localAdmin);
  }, []);
  if (localStorage.getItem('token') === null) {
    const baseURL: any = api.getBaseURL();
    window.location.href = baseURL;
  }
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
