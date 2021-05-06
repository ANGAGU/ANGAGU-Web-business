import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Row } from 'reactstrap';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as THREE from 'three';
import { MTLModel, DAEModel, DirectionLight } from 'react-3d-viewer';
import api from '../../../api';
import model from '../../../assets/modernobj.obj';
import model1 from '../../../assets/DesignChair1.dae';
import mesh from '../../../assets/modernobj.mtl';

import './style.css';

const Modal3D = props => {
  const [modal, setModal] = useState(false);
  const [product3D, setProduct3D] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [modelExten, setModelExten] = useState('');
  const [content3D, setContent3D] = useState(null);

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null);

  const handleclickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };
  const handleOnChange = evt => {
    const fileName = evt.target.files[0].name;
    const buffer = new Uint8Array(evt.target.files[0]);
    const blob = new Blob([buffer.buffer]);
    const fileDownloadUrl = URL.createObjectURL(blob);

    console.log(fileDownloadUrl);

    setProduct3D(fileDownloadUrl);
    setModelExten(fileName.split('.').slice(-1)[0]);
    setModelData(blob);
  };

  const makeZip = _blob => {
    const zip = new JSZip();
    zip.file('file', _blob);
    zip.generateAsync({ type: 'blob' }).then(blob => {
      // console.log(blob);
      modelToServer(blob);
      // saveAs(blob, _name.concat('.zip'));
    });
  };
  const modelToServer = async _blob => {
    const sendingData = new FormData();
    sendingData.append('file', _blob);
    // await api.post(`/company/products/{productId}/ar`, {});
  };
  const confirmModel = () => {
    toggle();
    // makeZip(modelData);
  };
  const rejectModel = () => {
    setModelData(null);
    setProduct3D(null);
    toggle();
  };
  useEffect(() => {
    if (modelExten === 'dae') {
      setContent3D(
        <DAEModel src={product3D} width={700} height={500}>
          <DirectionLight color={0xff00ff} />
        </DAEModel>,
      );
    } else if (modelExten === 'obj') {
      setContent3D(<MTLModel src={product3D} mtl={mesh} texPath="" width={700} height={500} />);
    }
  }, [product3D, modelExten]);

  // const get3DContents = () => {
  //   let contentsLoader = null;

  //   if (modelExten === 'dae') {
  //     contentsLoader = (
  //       <DAEModel src={product3D} width={700} height={500}>
  //         <DirectionLight color={0xff00ff} />
  //       </DAEModel>
  //     );
  //   } else if (modelExten === 'obj') {
  //     contentsLoader = <MTLModel src={product3D} mtl={mesh} texPath="" width={700} height={500} />;
  //   }
  //   while (contentsLoader === null) {
  //     if (contentsLoader !== null) break;
  //   }
  //   return contentsLoader;
  // };

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
                {/* {product3D && get3DContents()} */}
                {product3D !== null ? content3D : null}
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="modal-btn--left" onClick={handleclickInput}>
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
