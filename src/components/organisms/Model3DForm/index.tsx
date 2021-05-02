/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import './style.css';
import { ModalMol } from '../../molecules';
import api from '../../../api';

const Model3DForm: React.FC = () => {
  const [product3D, setProduct3D] = useState(null as FileList | null);
  const inputRef = useRef(
    null as HTMLInputElement | null,
  ) as React.MutableRefObject<HTMLInputElement>;

  const getProduct3DModel = async () => {
    // const result = await api.post('/company/model', {});
    // if (result.status === 'success') {
    //
    //   alert('성공');
    //  setProduct3D(result.data);
    // } else {
    //   console.log(result);
    // }
  };
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('directory', '');
      inputRef.current.setAttribute('webkitdirectory', '');
    }
    getProduct3DModel();
  }, []);

  const uploadProduct3D = async () => {
    // const formData = new FormData();
    // formData.append('data', JSON.stringify(product3D));
    // const result = await api.post('/company/model', {file: formData});
    // if (result.status === 'success') {
    //
    //   alert('성공');
    //
    // } else {
    //   console.log(result);
    // }
  };
  const handleclickInput = () => {
    inputRef.current.click();
  };
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setProduct3D(files);
    alert(files[0].name);
    uploadProduct3D();
  };

  const modalContent = (
    <Container>
      <Row>
        <Col>
          <input type="file" onChange={handleOnChange} ref={inputRef} hidden />
        </Col>
      </Row>
      <Row>
        <Col className="model-view">요기에 미리보기 띄어도 좋을거 같아요옹!</Col>
      </Row>
    </Container>
  );
  return (
    <div className="product-3d-model">
      <h4>상품 3D 모델</h4>

      <ModalMol
        className="product-3d-model__modal"
        title="3D모델 등록하기"
        buttonLabel="3D모델 등록"
        confirmButtonText="확인"
        leftButtonText="3D모델 업로드"
        leftButtonAction={handleclickInput}
        name="product3DModel"
        content={modalContent}
      />
    </div>
  );
};

export default Model3DForm;
