import React, { useState } from 'react';
import { SideBar, Content, TopBar } from '../../components';
import './style.css';

const App: React.FC = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
      <div className="flex_vertical">
        <TopBar toggleSidebar={toggleSidebar} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </div>
  );
};


export default App;
