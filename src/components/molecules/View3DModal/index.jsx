/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable spaced-comment */
import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [size, setSize] = useState(['1000', '600']);

  const [mainFileList, setMainFileList] = useState([]);
  const [textureFileList, setTextureFileList] = useState([]);

  const [modelName, setModelName] = useState('');
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  useEffect(async () => {
    api.setAxiosDefaultHeader();
    const result = await api.get(`/company/products/${pid}/ar`, {});
    if (result.status === 'success') {
      setProduct3D(`http://d3u3zwu9bmcdht.cloudfront.net/${result.data.mainUrl}`);
      setProductTexture(result.data.textureUrl);
      setProductEx(result.data.mainUrl.split('.')[1]);
    }
  }, []);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    if (boxRef.current) {
      let height = boxRef.current.offsetHeight;
      let width = boxRef.current.offsetWidth;
      setSize([width.toString(), height.toString()]);
    }
  }, [boxRef]);
  const handleclickInput = () => {
    setProduct3D(null);
    setProductEx(null);
    setProductTexture(null);
    if (inputRef.current !== null) {
      inputRef.current.setAttribute('multiple', '');
    }
    inputRef.current.click();
  };

  const handleOnChange = async evt => {
    let mainFiles = [];
    let textureFiles = [];
    if (evt.target.files.length >= 1) {
      Array.from(evt.target.files).forEach(item => {
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
    const result = await api.upload(`/company/products/${pid}/ar`, {
      mainFile: mainFiles,
      textureFile: textureFiles,
    });
    if (result.status === 'success') {
      setProduct3D(`http://d3u3zwu9bmcdht.cloudfront.net/${result.data.mainUrl}`);
      setProductTexture(result.data.textureUrl);
      setMainFileList(mainFiles);
      setTextureFileList(textureFiles);
    }
  };

  const confirmModel = async () => {
    // notify('상품 3D 모델 업로드 완료!');
    api.setAxiosDefaultHeader();
    let mod = purl !== null ? 1 : 0;
    console.log(mod);
    const result = await api.upload(
      `/bundle/${pid}`,
      {
        mainFile: mainFileList[0],
        textureFile: textureFileList,
        isMod: mod,
      },
      true,
    );
    if (result.status === 'success') {
      notify('상품 3D 모델 번들링 요청 완료');
      let modelView = document.getElementById('modelView');
      if (modelView.lastChild) modelView.removeChild(modelView.lastChild);
      toggle();
    }
  };

  const rejectModel = () => {
    let modelView = document.getElementById('modelView');
    if (modelView.lastChild) modelView.removeChild(modelView.lastChild);
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
          <Container style={{ margin: 0, width: '100%', height: '100%', maxWidth: '1500px' }}>
            <Row>
              <Col>
                <input type="file" onChange={handleOnChange} ref={inputRef} hidden />
              </Col>
            </Row>
            <Row style={modalBodyStyle}>
              <Col id="modelView" className="model-view" style={visStyle}>
                {product3D && productTexture && (
                  <ThreeRender
                    size={size}
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
  margin: 0,
};
const visStyle = {
  width: '100%',
  height: '100%',
  // display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
};

export default View3DModal;
