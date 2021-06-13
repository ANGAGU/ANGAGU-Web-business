import React, { useEffect, useState } from 'react';
import { Jumbotron, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../../../api';
import './style.css';

const CompanyRegisterTemplate: React.FC = (props: any) => {
  const [businessNumber, setBusinessNumber] = useState(0);
  const [data, setData] = useState({
    name: 'test',
    phoneNumber: '010-0000-0000',
    email: 'test@test.com',
    password: 'test',
    businessNumber: '1302938741-1231323312',
    accountNumber: '1234-0000-123123',
    accountHolder: 'test',
    accountBank: '국민',
    is_prove: 0,
  });
  const submitNumber = async () => {
    api.setAxiosDefaultHeader();
    const result = await api.post('/company/info/business', {
      businessNumber,
    });
    if (result.status === 'success') {
      // eslint-disable-next-line no-alert
      alert('업데이트 성공');
      window.location.reload();
    } else {
      console.error(result);
    }
  };
  return (
    <Jumbotron style={{ height: '50%' }}>
      <Form>
        <FormGroup row>
          <Label for="businessName" sm={2}>
            사업자 번호
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="businessName"
              onClick={(e: any) => setBusinessNumber(e.target.value)}
              placeholder="사업자 번호를 입력하세요"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">사업자 등록증, 통신판매업 신고증을 업로드해주세요</FormText>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={submitNumber}>등록 신청하기</Button>
          </Col>
        </FormGroup>
      </Form>
    </Jumbotron>
  );
};

export default CompanyRegisterTemplate;
