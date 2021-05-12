/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { formStyle } from './style';
import api from '../../../api';

const InfoForm: React.FC = () => {
  const [data, setData] = useState({
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
  });
  // const [ownerName, setOwnerName] = useState('');
  // const [businessNumber, setBusinessNumber] = useState('');
  const createData = (name: string, id: string, text: string, button?: number, buttonText?: string) => {
    return { name, id, text, button, buttonText };
  };

  const rows = [
    createData('쇼핑몰명', 'name', data.name),
    createData('관리자명', 'ownerName', data.ownerName),
    createData('사업자등록번호', 'businessNumber', data.businessNumber),
    createData('대표 휴대전화', 'phoneNumber', data.phoneNumber),
    createData('대표 이메일', 'email', data.email),
    createData('비밀번호', 'password', data.password),
    createData('계좌번호', 'accountNumber', data.accountnumber),
    createData('계좌 본인', 'accountHolder', data.accountHolder),
    createData('승인 상태', 'isApprove', data.isApprove),
  ];
  const getCompanyInfo = async () => {
    const key = localStorage.getItem('token');
    // try {
    //   const result = await api.get('/company/info', { key: key });
    //   if (result.status === 'success') {
    //     setData(result.data);
    //   } else {
    //     console.log(result);
    //   }
    // } catch {
    //   console.log('error');
    // }
  };
  const updateInfo = async () => {
    const key = localStorage.getItem('token');
    // try {
    //   const result = await api.post('/company/info', data);
    //   if (result.status === 'success') {
    //     // eslint-disable-next-line no-alert
    //     alert('로그인 성공');
    //   } else {
    //     console.log(result);
    //   }
    // } catch {
    //   console.log('error');
    // }
  };
  useEffect(() => {
    getCompanyInfo();
  }, []);
  return (
    <div>
      <Form style={formStyle}>
        {rows.map((item, index) => (
          <FormGroup key={`formGroup_${index}`} row>
            <Label for={item.id} sm={2}>
              {item.name}
            </Label>
            <Col sm={5}>
              <Input name={item.id} id={item.id} placeholder={item.text} />
            </Col>
          </FormGroup>
        ))}
      </Form>
      <div style={visStyle}>
        <Button outline color="secondary" onClick={updateInfo}>
          {'\t내용 수정\t'}
        </Button>
      </div>
    </div>
  );
};
const visStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
};
export default InfoForm;
