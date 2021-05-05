import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Row } from 'reactstrap';
import { MTLModel } from 'react-3d-viewer';
import model from '../../../assets/modernobj.obj';
import mesh from '../../../assets/modernobj.mtl';

import './style.css';

const Modal3D: React.FC = props => {
  const [modal, setModal] = useState(false);
  const [product3D, setProduct3D] = useState(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null as HTMLInputElement | null) as React.MutableRefObject<HTMLInputElement>;
  const parentRef = useRef(null as HTMLInputElement | null) as React.MutableRefObject<HTMLInputElement>;

  const handleclickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };
  const handleOnChange = () => {
    console.log(model);
    setProduct3D(model);
  };
  // useEffect(() => {
  //   // eslint-disable-next-line no-extra-boolean-cast
  //   if (!!parentRef.current) {
  //     setWidth(parentRef.current.offsetWidth);
  //     setHeight(parentRef.current.offsetHeight);
  //   }
  // }, [parentRef.current]);
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
              <Col className="model-view">
                <div style={visStyle}>{<MTLModel src={model} mtl={mesh} texPath="" width={700} height={500} />}</div>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="modal-btn--left" onClick={handleclickInput}>
            {'3D모델 업로드'}
          </Button>
          <Button color="primary" onClick={toggle}>
            확인
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
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
