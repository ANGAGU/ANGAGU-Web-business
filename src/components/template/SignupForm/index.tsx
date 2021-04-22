import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import './style.css';

type UserInfo = {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  commpany: string;
  account: string;
};
const SignupForm: React.FC = () => {
  // state & variable
  const [submitValue, setSubmitValue] = useState({} as UserInfo);

  const submitUserInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();
    const formData = new FormData();

    formData.append('data', JSON.stringify(submitValue));
    // formData.append('name', JSON.stringify(submitValue.price));
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // send api
    // await post(url, formData, config)

    alert(`submit Data!${submitValue.email}`);
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setSubmitValue({ ...submitValue, [name]: value });
  };

  return (
    <Container>
      <Row>
        <h2>회원가입</h2>
      </Row>
      <Row>
        <Form id="signup" onSubmit={submitUserInfo}>
          <FormGroup>
            <Label for="userEmail">이메일</Label>
            <Input
              type="text"
              name="email"
              id="userEmail"
              value={submitValue.email}
              onChange={handleOnChange}
              placeholder="이메일을 적어주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="userPassword"
              value={submitValue.password}
              onChange={handleOnChange}
              placeholder="비밀번호를 적어주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPasswordConfirm">비밀번호 확인</Label>
            <Input
              type="password"
              name="passwordConfirm"
              id="userPasswordConfirm"
              value={submitValue.passwordConfirm}
              onChange={handleOnChange}
              placeholder="비밀번호를 적어주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPhone">휴대폰</Label>
            <Input
              type="text"
              name="phone"
              id="userPhone"
              value={submitValue.phone}
              onChange={handleOnChange}
              placeholder="휴대폰 번호를 적어주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label for="userCommpany">회사명</Label>
            <Input
              type="text"
              name="commpany"
              id="userCommpany"
              value={submitValue.commpany}
              onChange={handleOnChange}
              placeholder="회사 이름을 적어주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label for="userAccount">계좌</Label>
            <Input
              type="text"
              name="account"
              id="userAccount"
              value={submitValue.account}
              onChange={handleOnChange}
              placeholder="정산 받을 계좌를 적어주세요."
            />
          </FormGroup>
          <Row>
            <Button type="submit" form="signup">
              Submit
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default SignupForm;
