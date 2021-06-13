import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
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
  desc: string;
  delivery_charge: number;
};

type PreviewURL = {
  productImg1: string;
  productImg2: string;
};

const ProductDetailTemplate: React.FC = () => {
  // state & variable
  const [productValue, setProductValue] = useState({} as ProductInfo);
  const [descImg, setDescImg] = useState(null as File | null);
  const [thumbImg, setThumbImg] = useState(null as File | null);
  const [detailImgs, setDetailImgs] = useState([] as Array<File | null>);
  const [detailImgOrder, setDetailImgOrder] = useState({});
  const [previewURL, setPreviewURL] = useState({} as PreviewURL);

  const history = useHistory();
  const imgFormData = new FormData();
  const productsGroupList: Array<string> = ['폭신폭신 의자', '안폭신폭신 의자', '물침대', '돌침대'];

  // comp
  const productGroup = productsGroupList.map(group => <option key={group}>{group}</option>);
  // method
  const submitProductInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();

    // for 상세 이미지 test 처리
    const detailImg = thumbImg as File;

    api.setAxiosDefaultHeader();
    const { status, data } = await api.upload('/company/products', {
      product_image: [detailImg],
      order: JSON.stringify({ [detailImg.name]: 1 }),
      desc_image: descImg,
      thumb_image: thumbImg,
      description: productValue.desc,
      name: productValue.name,
      price: productValue.price,
      stock: productValue.stock,
      delivery_charge: productValue.delivery_charge,
    });
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

  const handleDescImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setDescImg(files[0]);
    handleOnChange(evt);
  };
  const handleThumbImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setThumbImg(files[0]);
    handleOnChange(evt);
  };
  const handleDetailImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = evt.target as HTMLInputElement;
    const files = evt.target.files as FileList;

    // set preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL({ ...previewURL, [name]: reader.result });
    };
    reader.readAsDataURL(files[0]);

    // set img file
    const tempList = detailImgs;
    tempList[Number(name) - 1] = files[0]; // eslint 구조분해할당 선호 에러 발생.. 구조분해로 어떻게 해야하나 확인해보기
    setDetailImgs(tempList);
    // set order
    setDetailImgOrder({ ...detailImgOrder, [files[0].name]: Number(name) });
    // imgFormData.append(name, files[0]);
  };

  return (
    <Fade cascade damping={0.01}>
      <Container style={containerStyle}>
        <Row className="product-detail__header" style={titleStyle}>
          <Col className="product-detail__ttl-blk" style={marginStyle}>
            <h4 className="product__title">상품정보</h4>
          </Col>
          <Col className="product-detail__btn-blk" style={marginStyle}>
            <Button type="submit" form="productPrimary">
              Submit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="product-col__img" xs="5" style={colStyle}>
            <div className="product-img">
              <div className="product-img__content">
                <Form>
                  <FormGroup className={'form_group'}>
                    <Label for="productThumbImg" className={'image_label'}>
                      상품 썸네일 이미지
                    </Label>
                    <ImageUploader label="test" setImg={setThumbImg} />
                    {/* <Input type="file" name="thumb_image" id="productThumbImg" onChange={handleThumbImg} /> */}
                  </FormGroup>

                  {/* <FormGroup className={'form_group'}>
                    <Label for="productDetailImg" className={'image_label'}>
                      상품 상세 이미지
                    </Label>
                    <Input type="file" name="1" onChange={handleDetailImg} />
                 
                    <Input type="file" name="2" onChange={handleDetailImg} />
                    <Input type="file" name="3" onChange={handleDetailImg} />
                    <Input type="file" name="4" onChange={handleDetailImg} />
                    <Input type="file" name="5" onChange={handleDetailImg} />
                    <FormText color="muted" className={'description_label'}>
                      상품 상세 이미지를 넣어주세요 :)
                    </FormText>
                  </FormGroup> */}

                  <FormGroup className={'form_group form_group--last'}>
                    <Label for="productDescImg" className={'image_label'}>
                      상품 설명 이미지
                    </Label>
                    <ImageUploader label="test" setImg={setDescImg} />
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
              {/* <FormGroup>
                <Label for="productGroup" className={'image_label'}>
                  그룹
                </Label>
                <Input
                  type="select"
                  name="group"
                  id="productGroup"
                  defaultValue={productValue.group}
                  onChange={handleOnChange}
                >
                  {productGroup}
                </Input>
              </FormGroup> */}
              <FormGroup>
                <Label for="productDesc" className={'image_label'}>
                  상품 상세 설명
                </Label>
                <Input
                  type="textarea"
                  name="desc"
                  id="productDesc"
                  autoComplete={'off'}
                  defaultValue={productValue.desc}
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
};
// const contentStyle = {
//   height: '100vh',
// };
const colStyle = {
  // borderRight: 'solid 1px',
  paddingLeft: '25px',
  paddingRight: '25px',
  overflow: 'scroll',
};
const horizonLine = (
  <hr
    style={{
      color: '#000000',
      backgroundColor: '#000000',
      height: 0.5,
      borderColor: '#000000',
    }}
  />
);

export default ProductDetailTemplate;
