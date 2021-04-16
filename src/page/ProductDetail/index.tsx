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
import './style.css';
import { Dummy } from '../../utils';

// 임시
import testImg from '../../assets/product_test.jpeg';

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  stock: number;
  rate: number;
  createDt: string;
}

const ProductDetail: React.FC = () => {
  // set state
  const productsGroupList: Array<string> = [
    '폭신폭신 의자',
    '안폭신폭신 의자',
    '물침대',
    '돌침대',
  ];
  const productGroup = productsGroupList.map(group => <option>{group}</option>);

  return (
    <Container>
      <Row>
        <Button>Submit</Button>
      </Row>
      <Row>
        <Col xs="5">
          <div className="product-img">
            <h4 className="produnct-img__title">상품 이미지</h4>
            <div className="product-img__content">
              <Form>
                <FormGroup>
                  <Input type="file" name="productExFile" id="productExFile" />
                </FormGroup>
              </Form>
              <div className="content__main">
                <img className="main-img" src={testImg} alt="" />
              </div>
            </div>
          </div>
          <div>
            <h4>상품 3D 모델</h4>
            <Button>3D 모델 등록</Button>
          </div>
        </Col>
        <Col xs="7">
          {' '}
          <Form>
            <FormGroup>
              <Label for="productName">상품명</Label>
              <Input
                type="text"
                name="productName"
                id="productName"
                placeholder="제목에 보일 상품 이름을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">상품 가격</Label>
              <Input
                type="number"
                name="productPrice"
                id="productPrice"
                placeholder="판매 가격을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productStock">재고</Label>
              <Input
                type="number"
                name="productStock"
                id="productStock"
                placeholder="판매 수량을 적어주세요."
              />
            </FormGroup>
            <FormGroup>
              <Label for="productGroup">그룹</Label>
              <Input type="select" name="productGroup" id="productGroup">
                {productGroup}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="productText">상품 상세 설명</Label>
              <Input type="textarea" name="productText" id="productText" />
            </FormGroup>
            <FormGroup>
              <Label for="productExFile">상품 상세 이미지</Label>
              <Input type="file" name="productExFile" id="productExFile" />
              <FormText color="muted">
                상품 상세 설명 이미지를 넣어주세요 :)
              </FormText>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
