import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Input, Form, FormGroup, Button } from 'reactstrap';
import './style.css';
import { getLogin, findPw } from './libs';
import api from '../../../api';

const LoginTemplate: React.FC = () => {
  const match = useRouteMatch();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const history = useHistory();
  const title =
    Object.keys(match.params).length === 0
      ? '로그인'
      : Object.keys(match.params)[0];

  return (
    <div className="login_wrapper">
      <div className="animate form login_form">
        <section className="login_content">
          <Form>
            <h1>{title}</h1>
            <FormGroup>
              <Input
                type="text"
                value={id}
                id="email"
                placeholder="아이디"
                onChange={e => {
                  setId(`${e.target.value}`);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                value={pw}
                placeholder="패스워드"
                onChange={e => {
                  setPw(`${e.target.value}`);
                }}
              />
            </FormGroup>
            <div>
              <Button
                onClick={e => {
                  e.preventDefault();
                  getLogin(title, api, id, pw, history);
                }}
              >
                로그인
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                color="link"
                onClick={(e: any) => {
                  e.preventDefault();
                  findPw(history);
                }}
              >
                비밀번호를 잊으셨나요?
              </Button>
            </div>
            <div className="clearfix" />
            <div className="separator">
              <p className="change_link">
                아이디가 없으신가요? &nbsp;
                <Link to={`${match.url}/Signup`} className="to_register">
                  회원가입
                </Link>
              </p>
              <div className="clearfix" />
              <br />
              <div>
                <h1>
                  <i className="fa fa-paw" /> 안가구
                </h1>
              </div>
            </div>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default LoginTemplate;
