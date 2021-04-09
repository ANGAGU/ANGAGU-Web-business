import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
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

function ProductPage(): React.ReactElement {
  const productsTitleList = [
    '',
    '상품 아이디',
    '이미지',
    '상품명',
    '판매가',
    '별점',
    '재고',
    '등록일자',
    '',
  ];
  // set state
  const [productDummyData] = useState(Dummy.makeProducts(10));

  const productsHeader = productsTitleList.map((ttl, index) => (
    <th key={index} className="column-title">{ttl}</th>
  ));

  const products = productDummyData.map((product, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? 'even pointer' : 'odd pointer'}
    >
      <td className="a-center">
        <input type="checkbox" className="flat" name="table_records" />
      </td>
      <td className=" ">{index}</td>
      <td className=" ">
        <img className="product__img" alt="" src={testImg} />
      </td>
      <td className=" ">
        {product.name} <i className="success fa fa-long-arrow-up" />
      </td>
      <td className=" ">{product.price}</td>
      <td className=" ">{product.rate}</td>
      <td className=" ">{product.stock}</td>
      <td className="a-right a-right ">{product.createDt}</td>
      <td className="last">
        <Button color="secondary">수정하기</Button>{' '}
      </td>
    </tr>
  ));

  return (
    <>
      <div className="product-page">
        <div className="x_content">
          <div className="table-responsive">
            <table className="table table-striped jambo_table bulk_action">
              <thead>
                <tr className="headings">{productsHeader}</tr>
              </thead>

              <tbody>{products}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
