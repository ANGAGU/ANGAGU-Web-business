/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable spaced-comment */
import { useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Row } from 'reactstrap';
import { OBJModel } from 'react-3d-viewer';
import { ObjModelLoader } from 'components/atoms';
import { Canvas, useLoader } from '@react-three/fiber';
import { notify } from 'App';
import ThreeRender from '../../atoms/ThreeRender';
// import mesh from '../../../assets/IKE050020.mtl';
import api from '../../../api';
import './style.css';

const View3DModal = ({ pid, purl }) => {
  // set states
  const [modal, setModal] = useState(false);
  const [product3D, setProduct3D] = useState(null);
  const [productEl, setProductEl] = useState(null);
  const [modelName, setModelName] = useState('');

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null);
  console.log('view 3d modal', pid);
  const handleclickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };

  const handleOnChange = async evt => {
    const formData = new FormData();
    formData.append('file', evt.target.files[0]);
    api.setAxiosDefaultHeader();
    const result = await api.upload(`/company/products/${pid}/ar`, {
      product_ar: evt.target.files[0],
    });
    if (result.status === 'success') {
      notify('상품 3D 모델 업로드 완료!');
      setProduct3D(`http://d3u3zwu9bmcdht.cloudfront.net/${result.data.url}`);
      setModelName(evt.target.files[0].name);
      // setProduct3D(fileDownloadUrl);
    } else {
      console.log('ERROR: in customer products');
    }
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
        {purl !== null ? '3D 모델 수정' : '3D 모델 등록'}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={'product-3d-model__modal'} style={modalStyle}>
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
                {product3D && (
                  <ThreeRender size={['1200', '700']} modelURL={product3D} modelName={modelName} />
                )}
                {/* {product3D && <ObjModelLoader model={product3D} mtl={mesh} />} */}
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
const modalStyle = {
  maxWidth: '1500px',
  height: '93%',
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
