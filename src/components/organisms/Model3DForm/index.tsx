/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import './style.css';
import { ModalMol } from '../../molecules';
import api from '../../../api';

const Model3DForm: React.FC = () => {
  const [product3D, setProduct3D] = useState(null as File | null);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const getProduct3DModel = async () => {
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
    getProduct3DModel();
  }, []);

  const handleclickInput = () => {
    inputRef.current.click();
  };
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setProduct3D(files[0]);
    alert('!!');
  };
  return (
    <div className="product-3d-model">
      <h4>상품 3D 모델</h4>

      <ModalMol
        className="product-3d-model__modal"
        title="test"
        buttonLabel="3D모델 등록"
        confirmButtonText="확인"
        leftButtonText="3D모델 업로드"
        leftButtonAction={handleclickInput}
        name="fdf"
        content={
          <Container>
            <Row>
              <Col>
                <input type="file" ref={inputRef} onChange={handleOnChange} hidden />
              </Col>
            </Row>
            <Row>
              <Col>fd</Col>
            </Row>
          </Container>
        }
      />
    </div>
  );
};

export default Model3DForm;
