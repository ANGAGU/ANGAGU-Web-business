import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { ImageUploader } from 'components/molecules';
import { notify } from 'App';

import './style.css';

import api from '../../../api';

type ProductInfo = {
  name: string;
  price: number;
  stock: number;
  group: string;
  description: string;
  delivery_charge: number;
  height: number;
  width: number;
  depth: number;
  thumb_url: string;
  description_url: string;
};

type PreviewURL = {
  productImg1: string;
  productImg2: string;
};
type ProductDetailProps = {
  id: string;
};

const ProductDetailTemplate: React.FC<RouteComponentProps<ProductDetailProps>> = ({ match }) => {
  // state & variable
  const [productValue, setProductValue] = useState({} as ProductInfo);
  const [descImg, setDescImg] = useState(null as File | null);
  const [thumbImg, setThumbImg] = useState(null as File | null);
  const [isModification, setIsModification] = useState(false as boolean);
  const [productId, setProductId] = useState('' as string);

  const history = useHistory();

  // method

  useEffect(() => {
    const idx = match.params.id;
    if (idx !== 'new') {
      setProductId(idx);
      setIsModification(true);
      getProduct(idx);
    }
  }, []);

  const getProduct = async (idx: string) => {
    const { status, data } = await api.get(`/company/products/${idx}`, {});
    if (status === 'success') {
      setProductValue(data);
    } else {
      console.error('fail for get product info');
    }
  };
  const submitProductInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();
    const detailImg = thumbImg as File;
    let params: any;
    if (isModification) {
      params = {
        detail: JSON.stringify({
          description: productValue.description,
          name: productValue.name,
          price: productValue.price,
          stock: productValue.stock,
          delivery_charge: productValue.delivery_charge,
          width: productValue.width,
          height: productValue.height,
          depth: productValue.depth,
        }),
      };
      if (thumbImg !== null) params.thumb_image = thumbImg;
      if (descImg !== null) params.desc_image = descImg;
    } else
      params = {
        product_image: [detailImg],
        order: detailImg ? JSON.stringify({ [detailImg.name]: 1 }) : null,
        desc_image: descImg,
        thumb_image: thumbImg,
        description: productValue.description,
        name: productValue.name,
        price: productValue.price,
        stock: productValue.stock,
        delivery_charge: productValue.delivery_charge,
        width: productValue.width,
        height: productValue.height,
        depth: productValue.depth,
      };

    // for 상세 이미지 test 처리

    const { status, data } = await api.upload(
      `/company/products/${productId}`,
      params,
      false,
      isModification,
    );
    if (status === 'success') {
      history.push('/Main/Product');
      notify('상품 등록 완료!');
    } else {
      console.error('fail for send product info');
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setProductValue({ ...productValue, [name]: value });
  };

  const deleteProduct = async () => {
    const { status, data } = await api.delete(`/company/products/${productId}`, {});
    if (status === 'success') {
      history.push('/Main/Product');
      notify('상품 삭제 완료!');
    } else {
      console.error('fail for delete product detail');
    }
  };

  return (
    <Fade cascade damping={0.01}>
      <Container style={containerStyle}>
        <Row className="product-detail__header" style={titleStyle}>
          <Col className="product-detail__ttl-blk" style={marginStyle}>
            <h4 className="product__title">상품정보</h4>
          </Col>
          <Col className="product-detail__btn-blk" style={marginStyle}>
            <Button style={btnStyle} onClick={deleteProduct}>
              삭제하기
            </Button>
            <Button style={btnStyle} type="submit" form="productPrimary">
              등록하기
            </Button>
          </Col>
        </Row>
        <Row style={{ height: '100%' }}>
          <Col className="product-col__img" xs="5" style={colStyle}>
            <div className="product-img">
              <div className="product-img__content">
                <Form>
                  <FormGroup className={'form_group'}>
                    <Label for="productThumbImg" className={'image_label'}>
                      상품 썸네일 이미지
                    </Label>
                    <ImageUploader label="test" setImg={setThumbImg} url={productValue.thumb_url} />
                    {/* <Input type="file" name="thumb_image" id="productThumbImg" onChange={handleThumbImg} /> */}
                  </FormGroup>

                  <FormGroup className={'form_group form_group--last'}>
                    <Label for="productDescImg" className={'image_label'}>
                      상품 설명 이미지
                    </Label>
                    <ImageUploader label="test" setImg={setDescImg} url={productValue.description_url} />
                    {/* <Input type="file" name="desc_image" id="productDescImg" onChange={handleDescImg} /> */}
                  </FormGroup>
                </Form>
                <div className="content__main">{/* <img className="main-img" src={testImg} alt="" /> */}</div>
              </div>
            </div>
          </Col>
          <Col xs="7" style={colStyle}>
            <Form id="productPrimary" onSubmit={submitProductInfo}>
              <FormGroup>
                <Label for="productName" className={'image_label'}>
                  상품명
                </Label>
                <Input
                  type="text"
                  name="name"
                  autoComplete={'off'}
                  id="productName"
                  defaultValue={productValue.name}
                  onChange={handleOnChange}
                  placeholder="상품 이름을 적어주세요."
                />
              </FormGroup>
              <FormGroup>
                <Label for="productPrice" className={'image_label'}>
                  상품 가격
                </Label>
                <Input
                  type="number"
                  name="price"
                  id="productPrice"
                  autoComplete={'off'}
                  defaultValue={productValue.price}
                  onChange={handleOnChange}
                  placeholder="판매 가격을 적어주세요."
                />
              </FormGroup>
              <FormGroup>
                <Label for="deliveryCharge" className={'image_label'}>
                  배송비
                </Label>
                <Input
                  type="number"
                  name="delivery_charge"
                  id="deliveryCharge"
                  autoComplete={'off'}
                  defaultValue={productValue.delivery_charge}
                  onChange={handleOnChange}
                  placeholder="배송비를 적어주세요."
                />
              </FormGroup>
              <FormGroup>
                <Label for="productStock" className={'image_label'}>
                  재고
                </Label>
                <Input
                  type="number"
                  name="stock"
                  id="productStock"
                  autoComplete={'off'}
                  defaultValue={productValue.stock}
                  onChange={handleOnChange}
                  placeholder="판매 수량을 적어주세요."
                />
              </FormGroup>
              <Row>
                <Col xs="4">
                  <FormGroup>
                    <Label for="productWidth">가로</Label>
                    <Input
                      type="number"
                      name="width"
                      id="productWidth"
                      autoComplete={'off'}
                      defaultValue={productValue.width}
                      onChange={handleOnChange}
                      placeholder="제품 가로길이"
                    />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label for="productDepth">세로</Label>
                    <Input
                      type="number"
                      name="depth"
                      id="productDepth"
                      autoComplete={'off'}
                      defaultValue={productValue.depth}
                      onChange={handleOnChange}
                      placeholder="제품 세로길이"
                    />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label for="productHeight">높이</Label>
                    <Input
                      type="number"
                      name="height"
                      id="productHeight"
                      autoComplete={'off'}
                      defaultValue={productValue.height}
                      onChange={handleOnChange}
                      placeholder="제품 높이"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="productDesc" className={'image_label'}>
                  상품 상세 설명
                </Label>
                <Input
                  type="textarea"
                  name="description"
                  id="productDesc"
                  autoComplete={'off'}
                  defaultValue={productValue.description}
                  onChange={handleOnChange}
                  maxLength={500}
                  placeholder="상품에 대한 간단한 설명을 적어주세요 :)"
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fade>
  );
};

const titleStyle = {
  backgroundColor: 'black',
  color: 'white',
  alignItems: 'center',
  height: 56,
  borderRadius: '5px 5px 0px 0px',
};
const marginStyle = {
  margin: '10px',
};
const containerStyle = {
  maxWidth: '100%',
  height: '100vh',
};

const colStyle = {
  paddingLeft: '25px',
  paddingRight: '25px',
  overflow: 'scroll',
};

const btnStyle = {
  marginLeft: '10px',
  backgroundColor: 'rgba(255,255,255,0.1)',
};

export default ProductDetailTemplate;
