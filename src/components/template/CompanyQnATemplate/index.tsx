import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { CompanyOrderTable } from '../../organisms';
import './style.css';

const CompanyQnATemplate: React.FC = () => {
  return (
    <Fade cascade damping={0.05}>
      <CompanyOrderTable />
    </Fade>
  );
};

export default CompanyQnATemplate;
