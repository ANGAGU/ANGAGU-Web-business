import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import './style.css';
import { Dummy } from '../../../utils';
import api from '../../../api';

// 임시
import testImg from '../../../assets/product_test.jpeg';

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  stock: number;
  rate: number;
  create_time: string;
}

const ProductPageTemplate: React.FC = () => {
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

  const [products, setProducts] = useState(Dummy.makeProducts(10));
  // for api data binding
  // const [products, setProducts] = useState([] as Array<Product>);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const result = await api.get('/customer/products', {});
  //     if (result.status === 'success') {
  //       setProducts(result.data);
  //     }
  //   };
  //   getProducts();
  // }, []);
  const productsHeader = productsTitleList.map(ttl => (
    <th className="column-title">{ttl}</th>
  ));
  const productList = products.map((product, index) => (
    <tr
      key={product.id}
      className={index % 2 === 0 ? 'even pointer' : 'odd pointer'}
    >
      <td className="a-center">
        <input type="checkbox" className="flat" name="table_records" />
      </td>
      <td className=" ">{product.id}</td>
      <td className=" ">
        <img className="product__img" alt="" src={testImg} />
      </td>
      <td className=" ">
        {product.name} <i className="success fa fa-long-arrow-up" />
      </td>
      <td className=" ">{product.price}</td>
      <td className=" ">{5.0}</td>
      <td className=" ">{product.stock}</td>
      <td className="a-right a-right ">{product.create_time}</td>
      <td className="last">
        <Link to="/Main/Product/1">
          <Button color="secondary">수정하기</Button>
        </Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="product-page">
        <div className="x_content">
          <Table striped className="product-table">
            <thead>
              <tr className="headings">{productsHeader}</tr>
            </thead>

            <tbody>{productList}</tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProductPageTemplate;
