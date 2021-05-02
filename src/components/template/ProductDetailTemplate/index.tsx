import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { ModalMol } from '../../molecules';
import './style.css';

// 임시
import testImg from '../../../assets/product_test.jpeg';
import { Model3DForm } from '../../organisms';

interface ProductInfo {
  name: string;
  price: number;
  stock: number;
  group: string;
  desc: string;
  descImgUrl: string;
}

const ProductDetailTemplate: React.FC = () => {
  // state & variable
  const [submitValue, setSubmitValue] = useState({} as ProductInfo);
  const [descImg, setDescImg] = useState(null as File | null);

  const productsGroupList: Array<string> = [
    '폭신폭신 의자',
    '안폭신폭신 의자',
    '물침대',
    '돌침대',
  ];

  // comp
  const productGroup = productsGroupList.map(group => (
    <option key={group}>{group}</option>
  ));

  // method
  const submitProductInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();
    const formData = new FormData();

    formData.append('data', JSON.stringify(submitValue));
    // formData.append('name', JSON.stringify(submitValue.price));
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    // await post(url, formData, config)

    alert(`submit Data!${submitValue.name}`);
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setSubmitValue({ ...submitValue, [name]: value });
  };

  const handleOnChangeImg = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files as FileList;
    setDescImg(files[0]);
    handleOnChange(evt);
  };

  return (
    <Container>
      <Row>
        <Button type="submit" form="productPrimary">
          Submit
        </Button>
      </Row>
      <Row>
        <Col xs="5">
          <div className="product-img">
            <h4 className="produnct-img__title">상품 이미지</h4>
            <div className="product-img__content">
              <Form>
                <FormGroup>
                  <Input type="file" multiple name="productExFile" id="productExFile" />
                </FormGroup>
              </Form>
              <div className="content__main">
                <img className="main-img" src={testImg} alt="" />
              </div>
            </div>
          </div>
          <Model3DForm />
        </Col>
        <Col xs="7">
          <Form id="productPrimary" onSubmit={submitProductInfo}>
            <FormGroup>
              <Label for="productName">상품명</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                value={submitValue.name}
                onChange={handleOnChange}
                placeholder="상품 이름을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">상품 가격</Label>
              <Input
                type="number"
                name="price"
                id="productPrice"
                value={submitValue.price}
                onChange={handleOnChange}
                placeholder="판매 가격을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productStock">재고</Label>
              <Input
                type="number"
                name="stock"
                id="productStock"
                value={submitValue.stock}
                onChange={handleOnChange}
                placeholder="판매 수량을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productGroup">그룹</Label>
              <Input
                type="select"
                name="group"
                id="productGroup"
                value={submitValue.name}
                onChange={handleOnChange}
              >
                {productGroup}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="productDesc">상품 상세 설명</Label>
              <Input
                type="textarea"
                name="desc"
                id="productDesc"
                value={submitValue.desc}
                onChange={handleOnChange}
                maxLength={500}
                placeholder="상품에 대한 간단한 설명을 적어주세요 :)"
              />
            </FormGroup>
            <FormGroup>
              <Label for="productDescImg">상품 상세 이미지</Label>
              <Input
                type="file"
                name="descImgUrl"
                id="productDescImg"
                onChange={handleOnChangeImg}
              />
              <FormText color="muted">상품 상세 설명 이미지를 넣어주세요 :)</FormText>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailTemplate;
