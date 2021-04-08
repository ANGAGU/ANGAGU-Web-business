import React, { useEffect } from "react";
import "./style.css";
import Chance from "chance";

//임시
import testImg from "../../assets/product_test.jpeg";

interface Product {
  img: String;
  id: Number;
  name: String;
  price: String;
  stock: Number;
  createDt: Date;
}

function ProductPage(): React.ReactElement {
  const chance = new Chance();
  let productDummyData: Array<Product> = [];

  useEffect(() => {
    makeDummyData(5);
    console.log(productDummyData);
  });

  const makeDummyData = (num: Number): void => {
    for (let i = 0; i < num; i++) {
      productDummyData.push({
        img: "../../assets/product_test.jpeg",
        id: chance.integer({ min: 0, max: 100 }),
        name: chance.word(),
        price: chance.dollar(),
        stock: chance.integer({ min: 0, max: 100 }),
        createDt: chance.date(),
      });
    }
  };

  return (
    <div className="product-page">
      <div className="x_content">
        <div className="table-responsive">
          <table className="table table-striped jambo_table bulk_action">
            <thead>
              <tr className="headings">
                <th />
                <th className="column-title">이미지</th>
                <th className="column-title">상품 아이디</th>
                <th className="column-title">상품명</th>
                <th className="column-title">판매가 </th>
                <th className="column-title">재고 </th>
                <th className="column-title">등록일자 </th>
                <th className="column-title no-link last">
                  <span className="nobr">수정하기</span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="even pointer">
                <td className="a-center">
                  <input
                    type="checkbox"
                    className="flat"
                    name="table_records"
                  />
                </td>
                <td className=" ">
                  <img className="product__img" src={testImg}></img>
                </td>
                <td className=" ">May 23, 2014 11:47:56 PM </td>
                <td className=" ">
                  121000210 <i className="success fa fa-long-arrow-up"></i>
                </td>
                <td className=" ">John Blank L</td>
                <td className=" ">Paid</td>
                <td className="a-right a-right ">$7.45</td>
                <td className=" last">
                  <span>View</span>
                </td>
              </tr>

              <tr className="odd pointer">
                <td className="a-center ">
                  <input
                    type="checkbox"
                    className="flat"
                    name="table_records"
                  />
                </td>
                <td className=" ">121000039</td>
                <td className=" ">May 23, 2014 11:30:12 PM</td>
                <td className=" ">
                  121000208 <i className="success fa fa-long-arrow-up"></i>
                </td>
                <td className=" ">John Blank L</td>
                <td className=" ">Paid</td>
                <td className="a-right a-right ">$741.20</td>
                <td className=" last">
                  <span>View</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
