import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
  const [productDummyData] = useState(Dummy.makeProducts(10));

  return (
    <Container>
      <Row>
        <Col xs="5">
          <div className="product-img">
            <h4 className="produnct-img__title">상품 이미지</h4>
            <div className="product-img__content">
              <div className="content__main">
                <img className="main-img" src={testImg} alt="" />
              </div>
            </div>
          </div>
          <div>
            <h4>상품 3D 모델</h4>
          </div>
        </Col>
        <Col xs="7">fdf</Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
