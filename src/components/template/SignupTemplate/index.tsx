import React, { useState } from 'react';
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import api from '../../../api';
import { isEmail, isPassword, isSame } from '../../../utils';
import './style.css';

// 추후 nested object로 만들기
interface UserInfo {
  email: string;
  password: string;
  passwordConfirm: string;
  phone_number: string;
  name: string;
  account_bank: string;
  account_number: string;
  account_holder: string;
}
const SignupTemplate: React.FC = () => {
  // state & variable
  const [submitValue, setSubmitValue] = useState({} as UserInfo);
  const [isValid, setIsValid] = useState(false as boolean);
  const [verifyNumber, setVerifyNumber] = useState('' as string);
  const [authToken, setAuthToken] = useState('' as string);
  const [viewModal, setViewModal] = useState(false as boolean);

  const submitUserInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();

    // 보내기 전 validation 필요
    // const formData = new FormData();

    // formData.append('data', JSON.stringify(submitValue));
    // formData.append('name', JSON.stringify(submitValue.price));
    // console.log(formData);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // send api
    // await post(url, formData, config)
    console.log(authToken);
    console.log(submitValue);
    api.setHeaderVerification(authToken);

    const { status, data } = await api.post('/company/signup', submitValue);
    if (status === 'success') {
      alert('OK!');
    } else {
      console.log('fail for send sms');
    }
    alert(`submit Data!${submitValue.email}`);
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    console.log(name, value);
    setSubmitValue({ ...submitValue, [name]: value });
  };

  const handleVerifyNumber = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    console.log(value);
    setVerifyNumber(value);
  };

  const checkDuplicatedEmail = async () => {
    console.log(submitValue.email);
    const { status, data } = await api.post('/company/signup/email', {
      email: submitValue.email,
    });
    if (status === 'success') {
      alert('OK!');
    } else {
      console.log('fail email check');
    }
  };

  const requestAuthNumber = async () => {
    const { status, data } = await api.post('/company/signup/sms/code', {
      phone_number: submitValue.phone_number,
    });
    if (status === 'success') {
      alert('OK!');
    } else {
      console.log('fail for send sms');
    }
    toggleModal();
  };

  const checkAuthNumber = async () => {
    const { status, data } = await api.post('/company/signup/sms/verification', {
      phone_number: submitValue.phone_number,
      code: verifyNumber,
    });
    if (status === 'success') {
      alert('OK!');
      setAuthToken(data.token);
    } else {
      console.log('fail for verify sms');
    }
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
                <Button type="button" size="sm" onClick={checkDuplicatedEmail}>
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
                  name="phone_number"
                  id="userPhone"
                  value={submitValue.phone_number}
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
                  <Input
                    type="text"
                    value={verifyNumber}
                    laceholder="인증번호를 입력해주세요."
                    onChange={handleVerifyNumber}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={checkAuthNumber}>
                    인증번호확인
                  </Button>
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
                name="name"
                id="userCommpany"
                value={submitValue.name}
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
                    name="account_bank"
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
                    name="account_number"
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
                    name="account_holder"
                    value={submitValue.account_holder}
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

export default SignupTemplate;
