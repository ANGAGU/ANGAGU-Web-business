import React, { useState, useEffect } from "react";
import "./style.css";
import Chance from "chance";

//임시
import testImg from "../../assets/product_test.jpeg";

interface Product {
  id: Number,
  img: String,
  name: String,
  price: String,
  stock: Number,
  rate: Number,
  createDt: String,
}

function ProductPage(): React.ReactElement {
  const makeDummyData = (num: Number): Array<Product> => {
    let tempArr: Array<Product> = [];
    for (let i = 0; i < num; i++) {
      tempArr.push({
        id: chance.integer({ min: 0, max: 100 }),
        img: "../../assets/product_test.jpeg",
        name: chance.word(),
        price: chance.dollar(),
        stock: chance.integer({ min: 0, max: 100 }),
        rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
        createDt: chance.date().toDateString(),
      });
    }
  
    return tempArr;
  };

  const chance = new Chance();
  const [productDummyData] = useState(makeDummyData(30));

  const productList = productDummyData.map((product, index) => (
    <tr key={index} className={index % 2 == 0 ? "even pointer" : "odd pointer"}>
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
              <tr className="headings">
                <th />
                <th className="column-title">상품 아이디</th>
                <th className="column-title">이미지</th>
                <th className="column-title">상품명</th>
                <th className="column-title">판매가 </th>
                <th className="column-title">별점</th>
                <th className="column-title">재고 </th>
                <th className="column-title">등록일자 </th>
                <th className="column-title last"></th>
              </tr>
            </thead>

            <tbody>{productList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
