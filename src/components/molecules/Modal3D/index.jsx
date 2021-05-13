/* eslint-disable spaced-comment */
import React, { useState, useRef, useEffect, useReducer } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { DaeModelLoader, ObjModelLoader } from 'components/atoms';
import api from '../../../api';
import model from '../../../assets/modernobj.obj';
import model1 from '../../../assets/DesignChair1.dae';
import mesh from '../../../assets/modernobj.mtl';

import './style.css';

const Modal3D = props => {
  // set states
  const [modal, setModal] = useState(false);
  const [product3D, setProduct3D] = useState(null);
  const [modelExten, setModelExten] = useState('');

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null);

  const handleclickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };
  // const modelOnLoad = () => {
  //   forceUpdate();
  // };
  const handleOnChange = evt => {
    const buffer = new Uint8Array(evt.target.files[0]);
    const blob = new Blob([buffer.buffer]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setProduct3D(fileDownloadUrl);
  };

  const confirmModel = () => {
    toggle();
  };
  const rejectModel = () => {
    setProduct3D(null);
    toggle();
  };

  return (
    <div>
      <Button outline color="secondary" onClick={toggle}>
        3D 모델 등록
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={'product-3d-model__modal'}>
        <ModalHeader toggle={toggle}>{'3D모델 등록하기'}</ModalHeader>
        <ModalBody style={modalBodyStyle}>
          <Container>
            <Row>
              <Col>
                <input type="file" onChange={handleOnChange} ref={inputRef} hidden />
              </Col>
            </Row>
            <Row>
              <Col className="model-view" style={visStyle}>
                {product3D && <ObjModelLoader model3D={product3D} />}
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="modal-btn--left"
            onClick={handleclickInput}
          >
            {'3D모델 업로드'}
          </Button>
          <Button color="primary" onClick={confirmModel}>
            확인
          </Button>{' '}
          <Button color="secondary" onClick={rejectModel}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const modalBodyStyle = {
  width: '100%',
  height: '100%',
};
const visStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
};

export default Modal3D;
