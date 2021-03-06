import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
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
  FormFeedback,
} from 'reactstrap';

import api from 'api';
import { notify } from 'App';
import { ConfirmModal } from '../../molecules';
import { isEmail, isPassword, isSame } from '../../../utils';
import './style.css';

// 추후 nested object로 만들기
type UserInfo = {
  email: string;
  password: string;
  passwordConfirm: string;
  phone_number: string;
  name: string;
  account_bank: string;
  account_number: string;
  account_holder: string;
};
const SignupTemplate: React.FC = () => {
  // state & variable
  const [submitValue, setSubmitValue] = useState({} as UserInfo);
  const [authToken, setAuthToken] = useState('' as string);
  const [viewModal, setViewModal] = useState(false as boolean);
  const [checkEmailFormat, setCheckEmailFormat] = useState(false as boolean);
  const [checkEmail, setCheckEmail] = useState(false as boolean);
  const [checkPassword, setCheckPassword] = useState(false as boolean);
  const [checkPasswordConfirm, setCheckPasswordConfirm] = useState(false as boolean);
  const bankList = ['국민', '우리', '신한', '하나', '카카오'];

  const history = useHistory();

  const submitUserInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();
    if (checkPassword && checkPasswordConfirm && checkEmail) {
      api.setHeaderVerification(authToken);

      const { status, data } = await api.post('/company/signup', submitValue);
      if (status === 'success') {
        notify('안가구 회원가입 성공!');
        history.push('/Login');
      } else {
        console.error('fail to signup');
      }
    } else {
      notify('기입한 내용을 다시 한번 확인해 주세요!', 'error');
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    console.log(name, value);
    setSubmitValue({ ...submitValue, [name]: value });
  };

  const checkDuplicatedEmail = async () => {
    if (checkEmailFormat) {
      const { status, data } = await api.post('/company/signup/email', {
        email: submitValue.email,
      });
      if (status === 'success') {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
        console.error('fail email check');
      }
    } else {
      notify('이메일 형식을 다시 체크해주세요!', 'error');
    }
  };

  const requestAuthNumber = async () => {
    const { status, data } = await api.post('/company/signup/sms/code', {
      phone_number: submitValue.phone_number,
    });
    if (status === 'success') {
      alert('OK!');
    } else {
      console.error('fail for send sms');
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
                  valid={checkEmail}
                  invalid={!checkEmailFormat}
                  className="form-block__input input--id"
                  type="text"
                  name="email"
                  id="userEmail"
                  autoComplete={'off'}
                  defaultValue={submitValue.email}
                  onChange={evt => {
                    if (!isEmail(evt.target.value)) {
                      setCheckEmailFormat(false);
                    } else {
                      setCheckEmailFormat(true);
                    }
                    handleOnChange(evt);
                  }}
                  placeholder="이메일을 적어주세요."
                />
                <Button type="button" size="sm" onClick={checkDuplicatedEmail} style={ButtonStyle}>
                  중복확인
                </Button>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="userPassword">비밀번호</Label>
              <Input
                valid={checkPassword}
                invalid={!checkPassword}
                type="password"
                name="password"
                id="userPassword"
                autoComplete={'off'}
                defaultValue={submitValue.password}
                onChange={evt => {
                  if (!isPassword(evt.target.value)) {
                    setCheckPassword(false);
                  } else {
                    setCheckPassword(true);
                  }
                  handleOnChange(evt);
                }}
                placeholder="비밀번호를 적어주세요."
              />
              <FormText color="muted">영문, 숫자, 특수문자(!, @, #, $, %, ^, +, =) 포함 8~15자리</FormText>
              <FormFeedback valid={checkPassword}>
                {checkPassword ? '비밀번호 사용가능합니다!' : '비밀번호로 부적절해요:('}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="userPasswordConfirm">비밀번호 확인</Label>
              <Input
                valid={checkPasswordConfirm}
                invalid={!checkPasswordConfirm}
                type="password"
                name="passwordConfirm"
                id="userPasswordConfirm"
                defaultValue={submitValue.passwordConfirm}
                autoComplete={'off'}
                onChange={evt => {
                  if (!isSame(evt.target.value, submitValue.password)) {
                    setCheckPasswordConfirm(false);
                  } else {
                    setCheckPasswordConfirm(true);
                  }
                  handleOnChange(evt);
                }}
                placeholder="비밀번호를 한번 더 적어주세요."
              />
              <FormFeedback valid={checkPasswordConfirm}>
                {checkPasswordConfirm ? '비밀번호가 동일합니다!' : '비밀번호가 서로 달라요:('}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="userPhone">휴대폰</Label>
              <div className="form-block">
                <Input
                  className="form-block__input input--phone "
                  type="text"
                  name="phone_number"
                  id="userPhone"
                  autoComplete={'off'}
                  defaultValue={submitValue.phone_number}
                  onChange={handleOnChange}
                  placeholder="휴대폰 번호를 적어주세요."
                />
                <Button type="button" size="sm" onClick={requestAuthNumber} style={Button1Style}>
                  인증번호전송
                </Button>
              </div>
              <FormText color="muted"> &apos;-&apos; 를 빼고 적어주세요! (ex: 01012345678)</FormText>
              <ConfirmModal
                viewModal={viewModal}
                phoneNumber={submitValue.phone_number}
                setAuthToken={setAuthToken}
                toggleModal={toggleModal}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userCommpany">회사명</Label>
              <Input
                type="text"
                name="name"
                autoComplete={'off'}
                id="userCommpany"
                defaultValue={submitValue.name}
                onChange={handleOnChange}
                placeholder="회사 이름을 적어주세요."
              />
            </FormGroup>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label for="userAccount">은행</Label>
                  <Input
                    type="select"
                    name="account_bank"
                    autoComplete={'off'}
                    defaultValue={submitValue.account_bank}
                    onChange={handleOnChange}
                    placeholder="은행명"
                  >
                    {bankList.map((i, idx) => (
                      <option key={`formGroup ${idx}`}>{i}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="userAccount">계좌번호</Label>
                  <Input
                    type="text"
                    name="account_number"
                    autoComplete={'off'}
                    defaultValue={submitValue.account_number}
                    onChange={handleOnChange}
                    placeholder="계좌번호를 적어주세요."
                  />
                  <FormText color="muted"> &apos;-&apos; 를 빼고 적어주세요!</FormText>
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label for="userAccount">계좌주</Label>
                  <Input
                    type="text"
                    name="account_holder"
                    autoComplete={'off'}
                    defaultValue={submitValue.account_holder}
                    onChange={handleOnChange}
                    placeholder="계좌주명"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="form-btn">
              <Button className="form-btn__submit" type="submit" form="signup" color="info" block>
                안가구에 회원가입 하기
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

const ButtonStyle = {
  width: '100px',
};
const Button1Style = {
  width: '150px',
};

export default SignupTemplate;
