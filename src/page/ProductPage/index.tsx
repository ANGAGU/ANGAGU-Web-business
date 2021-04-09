import React, { useState, useEffect } from "react";
import "./style.css";
import { Dummy } from "../../utils";
import Chance from "chance";

//임시
import testImg from "../../assets/product_test.jpeg";

interface Product {
  id: Number;
  img: String;
  name: String;
  price: String;
  stock: Number;
  rate: Number;
  createDt: String;
}

function ProductPage(): React.ReactElement {
  const productsTitleList = ["", "상품 아이디", "이미지", "상품명", "판매가", "별점", "재고", "등록일자", ""];
  // set state
  const [productDummyData] = useState(Dummy.makeProducts(30));

  const productsHeader = productsTitleList.map((ttl) => <th className="column-title">{ttl}</th>);
  const products = productDummyData.map((product, index) => (
    <tr key={index} className={index % 2 === 0 ? "even pointer" : "odd pointer"}>
      <td className="a-center">
        <input type="checkbox" className="flat" name="table_records" />
      </td>
      <td className=" ">{index}</td>
      <td className=" ">
        <img className="product__img" src={testImg}></img>
      </td>
      <td className=" ">
        {product.name} <i className="success fa fa-long-arrow-up"></i>
      </td>
      <td className=" ">{product.price}</td>
      <td className=" ">{product.rate}</td>
      <td className=" ">{product.stock}</td>
      <td className="a-right a-right ">{product.createDt}</td>
      <td className="last">
        <button>수정하기</button>
      </td>
    </tr>
  ));

  return (
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
  );
}

export default ProductPage;
