import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { CompanyAdjustForm } from 'components/organisms';

import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};

const CompanyAdjustTemplate: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  return (
    <Fade>
      <Container className="adjust-page">
        <h3>정산 관리</h3>
        <hr />
        <CompanyAdjustForm />
      </Container>
    </Fade>
  );
};

export default CompanyAdjustTemplate;
