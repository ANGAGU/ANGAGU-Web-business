import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { CompanyAdjustForm } from 'components/organisms';

import './style.css';

const CompanyAnswerTemplate: React.FC = () => {
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

export default CompanyAnswerTemplate;
