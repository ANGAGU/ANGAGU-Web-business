/* eslint-disable prefer-const */
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
  const [productTexture, setProductTexture] = useState(null);
  const [productEx, setProductEx] = useState(null);
  const [modelName, setModelName] = useState('');

  const toggle = () => setModal(!modal);
  const inputRef = useRef(null);
  const handleclickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };

  const handleOnChange = async evt => {
    console.log(evt.target.files);
    let mainFiles = [];
    let textureFiles = [];
    if (evt.target.files.length >= 1) {
      Array.from(evt.target.files).forEach(item => {
        console.log(item.name.split('.')[1]);
        if (item.name.split('.')[1] === 'obj') {
          setProductEx('obj');
          mainFiles.push(item);
        } else if (item.name.split('.')[1] === 'fbx') {
          setProductEx('fbx');
          mainFiles.push(item);
        } else if (item.name.split('.')[1] === '3ds') {
          setProductEx('3ds');
          mainFiles.push(item);
        } else if (item.name.split('.')[1] === 'dae') {
          setProductEx('dae');
          mainFiles.push(item);
        } else if (item.name.split('.')[1] === 'dxf') {
          setProductEx('dxf');
          mainFiles.push(item);
        } else textureFiles.push(item);
        return '';
      });
    }

    api.setAxiosDefaultHeader();
    console.log(evt.target.files);
    const result = await api.upload(`/company/products/${pid}/ar`, {
      mainFile: mainFiles,
      textureFile: textureFiles,
    });
    if (result.status === 'success') {
      console.log(result.data);
      setProduct3D(`http://d3u3zwu9bmcdht.cloudfront.net/${result.data.mainUrl}`);
      setProductTexture(result.data.textureUrl);
    } else {
      console.error('ERROR: in customer products');
    }
  };

  const confirmModel = () => {
    notify('상품 3D 모델 업로드 완료!');
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
                {product3D && productTexture && (
                  <ThreeRender
                    size={['1200', '600']}
                    modelURL={product3D}
                    modelEx={productEx}
                    modelTexture={productTexture}
                  />
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
