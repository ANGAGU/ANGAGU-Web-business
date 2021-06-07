import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { AdminUserTable } from '../../organisms';
import './style.css';

const AdminUserTemplate: React.FC = () => {
  return (
    <Fade cascade damping={0.05}>
      <AdminUserTable />
    </Fade>
  );
};

export default AdminUserTemplate;
