/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import api from '../../../api';
import { formStyle } from './style';

const CompanyInfoForm: React.FC = () => {
  const [data, setData] = useState({
    name: 'test',
    phoneNumber: '010-0000-0000',
    email: 'test@test.com',
    password: 'test',
    businessNumber: '1302938741-1231323312',
    accountNumber: '1234-0000-123123',
    accountHolder: 'test',
    accountBank: '국민',
  });
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const [ownerName, setOwnerName] = useState('');
  // const [businessNumber, setBusinessNumber] = useState('');
  const createData = (name: string, id: string, text: string, account?: any, type?: number) => {
    return { name, id, text, account, type };
  };
  const bankList = ['국민', '우리', '신한', '하나', '카카오'];
  const rows = [
    createData('기업이름', 'name', data.name),
    createData('대표 이메일', 'email', data.email),
    // createData('사업자등록번호', 'businessNumber', data.businessNumber),
    createData('대표 휴대전화', 'phoneNumber', data.phoneNumber),
    createData('비밀번호', 'password', ''),
    createData('계좌정보', 'accountBank', data.accountBank, data.accountNumber, 1),
  ];

  const getCompanyInfo = async () => {
    try {
      api.setAxiosDefaultHeader();
      const result = await api.get('/company/info', {});
      if (result.status === 'success') {
        setData({
          name: result.data.name,
          phoneNumber: result.data.phone_number,
          email: result.data.email,
          password: result.data.password,
          businessNumber: result.data.business_number,
          accountNumber: result.data.account_number,
          accountHolder: result.data.account_holder,
          accountBank: result.data.account_bank,
        });
      } else {
        console.log(result);
      }
    } catch {
      console.log('error');
    }
  };
  const updateInfo = async (e: any) => {
    e.preventDefault();
    try {
      api.setAxiosDefaultHeader();
      const result = await api.post('/company/info', {
        name: data.name,
        password: data.password,
        accountNumber: data.accountNumber,
        accountHolder: data.accountHolder,
        accountBank: data.accountBank,
      });
      if (result.status === 'success') {
        // eslint-disable-next-line no-alert
        alert('업데이트 성공');
        window.location.reload();
      } else {
        console.log(result);
      }
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);
  return (
    <div>
      <Form style={formStyle}>
        {rows.map((item, index) => {
          return item.type !== undefined ? (
            <FormGroup key={`formGroup_${index}`} row>
              <Label for={item.id} sm={2}>
                {item.name}
              </Label>
              <Col sm={1} key={`formGroup_${index} 1`}>
                {' '}
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  onChange={e => setData({ ...data, [item.id]: e.target.value })}
                  value={item.text}
                >
                  {bankList.map((i, idx) => (
                    <option key={`formGroup_${index} ${idx}`}>{i}</option>
                  ))}
                </Input>
              </Col>
              <Col sm={4} key={`formGroup_${index} 3`}>
                {' '}
                <Input
                  name={item.id}
                  id={item.id}
                  value={item.account}
                  onChange={e => setData({ ...data, [item.id]: e.target.value })}
                />
              </Col>
            </FormGroup>
          ) : (
            <FormGroup key={`formGroup_${index}`} row>
              <Label for={item.id} sm={2}>
                {item.name}
              </Label>
              <Col sm={5} key={`formGroup_${index}`}>
                {' '}
                <Input
                  name={item.id}
                  id={item.id}
                  placeholder={item.text}
                  value={item.text}
                  onChange={e => setData({ ...data, [item.id]: e.target.value })}
                />
              </Col>
            </FormGroup>
          );
        })}
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
export default CompanyInfoForm;
