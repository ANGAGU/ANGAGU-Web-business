/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { formStyle } from './style';
import { ModalMol } from '../../molecules';
import api from '../../../api';

const InfoForm: React.FC = () => {
  // const [name, setName] = useState('');
  // const [ownerName, setOwnerName] = useState('');
  // const [businessNumber, setBusinessNumber] = useState('');
  

  const getCompanyInfo = async () => {
    const key = localStorage.getItem('token');
    const result = await api.get('/company/info', key);
    if (result.status === 'success') {
      // eslint-disable-next-line no-alert
      alert('로그인 성공');
      data = result.data;
    } else {
      console.log(result);
    }
  }
  useEffect(() => {
    getCompanyInfo();
  }, []);
  return (
    <Form style={formStyle}>
      {rows.map((item, index) => (
        <FormGroup key={`formGroup_${index}`} row>
          <Label for={item.id} sm={2}>
            {item.name}
          </Label>
          <Col sm={5}>
            <Input name={item.id} id={item.id} placeholder={item.text} />
          </Col>
          {item.button === 1 ? (
            <ModalMol
              title={item.name}
              buttonLabel={item.buttonText}
              className={item.id}
              name={item.text}
            />
          ) : null}
        </FormGroup>
      ))}
    </Form>
  );
};

const createData = (
  name: string,
  id: string,
  text: string,
  button?: number,
  buttonText?: string,
) => {
  return { name, id, text, button, buttonText };
};
let data = {
  name: 'test',
  ownerName: 'test',
  phoneNumber: '010-0000-0000',
  email: 'test@test.com',
  password: 'test',
  businessNumber: '1302938741-1231323312',
  accountnumber: '국민 1234-0000-123123',
  accountHolder: '홍길동',
  isApprove: '승인',
  isBlock: 'text',
};
const rows = [
  createData('쇼핑몰명', 'name', data.name),
  createData('관리자명', 'ownerName', '관리자명은 4~100byte까지 입력할 수 있습니다.'),
  createData(
    '사업자등록번호',
    'businessNumber',
    data.businessNumber,
    1,
    '사업자 등록번호 설정',
  ),
  createData('대표 휴대전화', 'phoneNumber', data.phoneNumber, 1, '대표 휴대전화 설정'),
  createData('대표 이메일', 'email', data.email, 1, '대표 이메일 설정'),
  createData('비밀번호', 'password', data.password, 1, '비밀번호 설정'),
  createData('계좌번호', 'accountNumber', data.accountnumber, 1, '계좌번호 설정'),
  createData('계좌 본인', 'accountHolder', data.accountHolder),
  createData('승인 상태', 'isApprove', data.isApprove),
];

export default InfoForm;
