import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { isEmail, isPassword, isSame } from '../../../utils';
import './style.css';

// 추후 nested object로 만들기
interface UserInfo {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  commpany: string;
  account_bank: string;
  account_number: string;
  account_owner: string;
}

const SignupForm: React.FC = () => {
  // state & variable
  const [submitValue, setSubmitValue] = useState({} as UserInfo);
  const [isValid, setIsValid] = useState(false as boolean);
  const [viewModal, setViewModal] = useState(false as boolean);

  const submitUserInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();

    // 보내기 전 validation 필요
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
    console.log(name, value);
    setSubmitValue({ ...submitValue, [name]: value });
  };

  const checkDuplicatedEmail = () => {
    // send api 필요
  };

  const requestAuthNumber = () => {
    // send api 필요
    toggleModal();
  };

  const checkAuthNumber = () => {
    // send api 필요
    toggleModal();
  };

  const toggleModal = () => {
    setViewModal(!viewModal);
  };

  return (
    <Container className="signup-form">
      <Row className="signup-form__row">
        <Col md={{ size: 5 }}>
          <h2>회원가입</h2>
        </Col>
      </Row>
      <Row className="signup-form__row">
        <Col className="form-content" md={{ size: 5 }}>
          <Form id="signup" onSubmit={submitUserInfo}>
            <FormGroup>
              <Label for="userEmail">아이디(이메일)</Label>
              <div className="form-block">
                <Input
                  className="form-block__input input--id"
                  type="text"
                  name="email"
                  id="userEmail"
                  value={submitValue.email}
                  onChange={evt => {
                    if (!isEmail(evt.target.value)) {
                      console.log('이메일 형식이 올바르지 않습니다.');
                    } else {
                      console.log('이메일 가능가능~');
                    }
                    handleOnChange(evt);
                  }}
                  placeholder="이메일을 적어주세요."
                />
                <Button type="button" size="sm">
                  중복확인
                </Button>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="userPassword">비밀번호</Label>
              <Input
                type="password"
                name="password"
                id="userPassword"
                value={submitValue.password}
                onChange={evt => {
                  if (!isPassword(evt.target.value)) {
                    console.log('비밀번호 형식이 올바르지 않습니다.');
                  } else {
                    console.log('비번 가능가능~');
                  }
                  handleOnChange(evt);
                }}
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
                onChange={evt => {
                  if (!isSame(evt.target.value, submitValue.password)) {
                    console.log('비밀번호가 다릅니다.');
                  } else {
                    console.log('비번 가능가능~');
                  }
                  handleOnChange(evt);
                }}
                placeholder="비밀번호를 한번 더 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="userPhone">휴대폰</Label>
              <div className="form-block">
                <Input
                  className="form-block__input input--phone "
                  type="text"
                  name="phone"
                  id="userPhone"
                  value={submitValue.phone}
                  onChange={handleOnChange}
                  placeholder="휴대폰 번호를 적어주세요."
                />
                <Button type="button" size="sm" onClick={requestAuthNumber}>
                  인증번호전송
                </Button>
              </div>
              <Modal isOpen={viewModal} toggle={toggleModal} size="sm" centered>
                <ModalHeader toggle={toggleModal}>인증번호 입력</ModalHeader>
                <ModalBody>
                  <Input type="text" placeholder="인증번호를 입력해주세요." />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={checkAuthNumber}>
                    인증번호확인
                  </Button>{' '}
                  <Button color="secondary" onClick={toggleModal}>
                    취소
                  </Button>
                </ModalFooter>
              </Modal>
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
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label for="userAccount">은행</Label>
                  <Input
                    type="text"
                    name="account"
                    id="userAccount"
                    value={submitValue.account_bank}
                    onChange={handleOnChange}
                    placeholder="은행명"
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="userAccount">계좌번호</Label>
                  <Input
                    type="text"
                    name="account"
                    id="userAccount"
                    value={submitValue.account_number}
                    onChange={handleOnChange}
                    placeholder="계좌번호를 적어주세요."
                  />
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label for="userAccount">계좌주</Label>
                  <Input
                    type="text"
                    name="account"
                    id="userAccount"
                    value={submitValue.account_owner}
                    onChange={handleOnChange}
                    placeholder="계좌주명"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="form-btn">
              <Button
                className="form-btn__submit"
                type="submit"
                form="signup"
                color="info"
                block
              >
                안오구에 회원가입 하기
              </Button>
              <Col className="form-btn">
                <Link className="form-btn__login" to="/Login">
                  로그인으로 돌아가기
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
