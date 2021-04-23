import React, { useEffect, useState } from 'react';
import {
  Jumbotron,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import './style.css';

const RegisterBusin: React.FC = () => {
  return (
    <Jumbotron>
      <Form>
        <FormGroup row>
          <Label for="businessName" sm={2}>
            사업자 명
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="businessName"
              placeholder="사업자 명을 입력하세요"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phoneNumber" sm={2}>
            연락처
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="phone"
              id="phoneNumber"
              placeholder="000-0000-0000"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            추가 필요사항 기입
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              사업자 등록증, 통신판매업 신고증을 업로드해주세요
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>등록 신청하기</Button>
          </Col>
        </FormGroup>
      </Form>
    </Jumbotron>
  );
};

export default RegisterBusin;
