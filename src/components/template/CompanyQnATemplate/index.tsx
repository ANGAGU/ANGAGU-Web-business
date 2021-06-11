import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { CompanyQnATable } from '../../organisms';
import './style.css';

const CompanyQnATemplate: React.FC = () => {
  return (
    <Fade cascade damping={0.05}>
      <CompanyQnATable />
    </Fade>
  );
};

export default CompanyQnATemplate;
