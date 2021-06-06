import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { CompanyRefundTable } from '../../organisms';
import './style.css';

const ManageRefundTemplate: React.FC = () => {
  return (
    <Fade cascade damping={0.05}>
      <CompanyRefundTable />
    </Fade>
  );
};

export default ManageRefundTemplate;
