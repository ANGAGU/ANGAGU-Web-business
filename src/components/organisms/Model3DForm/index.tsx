/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';
import { ModalMol } from '../../molecules';
import api from '../../../api';

const Model3DForm: React.FC = () => {
  // const [product3D, setProduct3D] = useState('');
  // const [ownerName, setOwnerName] = useState('');
  // const [businessNumber, setBusinessNumber] = useState('');

  const getCompanyInfo = async () => {
    // const key = localStorage.getItem('token');
    // const result = await api.post('/company/model', {"key": key});
    // if (result.status === 'success') {
    //
    //   alert('성공');
    //   data = result.data;
    // } else {
    //   console.log(result);
    // }
  };
  useEffect(() => {
    getCompanyInfo();
  }, []);
  return <div>fdfdf</div>;
};

export default Model3DForm;
