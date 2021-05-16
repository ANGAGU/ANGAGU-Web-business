/* eslint-disable array-callback-return */
/* eslint-disable spaced-comment */
import { useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Row } from 'reactstrap';
import { OBJModel } from 'react-3d-viewer';
import { ObjModelLoader } from 'components/atoms';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import ThreeRender from '../../atoms/ThreeRender';
import './style.css';

const View3DModal = props => {
  // set states
  const [modal, setModal] = useState(false);
  const [product3D, setProduct3D] = useState(null);
  const [productEl, setProductEl] = useState(null);
  const [modelExten, setModelExten] = useState('');

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null);

  const handleclickInput = () => {
    if (inputRef.current !== null) {
      // inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };
  // const modelOnLoad = () => {
  //   forceUpdate();
  // };

  const handleOnChange = async evt => {
    console.log(evt.target.files);
    const buffer = new Uint8Array(evt.target.files[0]);
    const blob = new Blob([buffer.buffer]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setProduct3D(fileDownloadUrl);
    // const reader = new FileReader();
    // reader.onload = e => {
    //   setProduct3D(reader.result);
    // };
    // reader.readAsDataURL(fileDownloadUrl);
    // console.log(evt.target.files);
    // const mtlReader = new FileReader();
    // mtlReader.onload = event => {
    //   setProductMTL(new MTLLoader().parse(event.target.result));
    // };
    // const file = evt.target.files[0];
    // const objReader = new FileReader();
    // objReader.addEventListener(
    //   'load',
    //   () => {
    //     const fileUrlList = objReader.result;
    //     setProduct3D(fileUrlList);
    //   },
    //   false,
    // );
    // objReader.readAsDataURL(blob);

    // for (let i = 0; i < 2; i += 1) {
    //   if (evt.target.files[i].name.indexOf('mtl')) {
    //     await mtlReader.readAsArrayBuffer(evt.target.files[i]);
    //   } else {
    //     objReader.readAsArrayBuffer(evt.target.files[i]);
    //   }
    // }
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
                {/* {
                  <div>
                    <OBJModel
                      width="400"
                      height="400"
                      position={{ x: 0, y: -100, z: 0 }}
                      src={'http://d3u3zwu9bmcdht.cloudfront.net/testModel/modernchair11obj.obj'}
                      onLoad={() => {
                        //...
                      }}
                      onProgress={xhr => {
                        //...
                      }}
                    />
                  </div>
                } */}
                {product3D && <ThreeRender size={['1200', '700']} modelURL={product3D} />}
                {/* {product3D && <ObjModelLoader model={product3D} mtl={productMTL} />} */}
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
  // display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
};

export default View3DModal;
