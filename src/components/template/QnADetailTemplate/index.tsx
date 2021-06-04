import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { CompanyAdjustForm } from 'components/organisms';

import './style.css';

const QnADetailTemplate: React.FC = () => {
  return (
    <Fade>
      <Container className="answer-page">
        <h3>상품문의 상세</h3>
        <hr />
        <CompanyAdjustForm />
      </Container>
    </Fade>
  );
};

export default QnADetailTemplate;
