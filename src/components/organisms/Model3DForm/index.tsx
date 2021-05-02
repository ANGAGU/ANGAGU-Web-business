/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';
import { ModalMol } from '../../molecules';
import api from '../../../api';

const Model3DForm: React.FC = () => {
  // const [name, setName] = useState('');
  // const [ownerName, setOwnerName] = useState('');
  // const [businessNumber, setBusinessNumber] = useState('');

  const getCompanyInfo = async () => {
    // const key = localStorage.getItem('token');
    // const result = await api.get('/company/info', {"key": key});
    // if (result.status === 'success') {
    //   // eslint-disable-next-line no-alert
    //   alert('로그인 성공');
    //   data = result.data;
    // } else {
    //   console.log(result);
    // }
  };
  useEffect(() => {
    getCompanyInfo();
  }, []);
  return <>fdfdf</>;
};

export default Model3DForm;
