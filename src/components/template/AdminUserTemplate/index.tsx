import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { AdminProductTable } from '../../organisms';
import './style.css';

const AdminUserTemplate: React.FC = () => {
  return (
    <Fade cascade damping={0.05}>
      <AdminProductTable />
    </Fade>
  );
};

export default AdminUserTemplate;
