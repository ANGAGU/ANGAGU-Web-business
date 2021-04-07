import React from "react";
import Chance from "chance";

interface Product {

}
function ProductPage(): React.ReactElement {
  const chance = new Chance();
  let productData: Array<Product> = []

  const makeDummyData = (): void => {

  };

  const test = (): void => {
    console.log(chance.email());
  };
  return (
    <div className="x_content">
      <div className="table-responsive">
        <table className="table table-striped jambo_table bulk_action">
          <thead>
            <tr className="headings">
              <th>
                <input type="checkbox" id="check-all" className="flat" />
              </th>
              <th className="column-title">이미지</th>
              <th className="column-title">상품 아이디</th>
              <th className="column-title">상품명</th>
              <th className="column-title">판매가 </th>
              <th className="column-title">재고 </th>
              <th className="column-title">등록일자 </th>
              <th className="column-title no-link last">
                <span className="nobr">수정하기</span>
              </th>
              {/* <th className="bulk-actions" >
                  <span className="antoo" >Bulk Actions ( <span className="action-cnt"> </span> ) <i className="fa fa-chevron-down"></i></span>
                </th> */}
            </tr>
          </thead>

          <tbody>
            <tr className="even pointer">
              <td className="a-center">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000040</td>
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
                <input type="checkbox" className="flat" name="table_records" />
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
            <tr className="even pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000038</td>
              <td className=" ">May 24, 2014 10:55:33 PM</td>
              <td className=" ">
                121000203 <i className="success fa fa-long-arrow-up"></i>
              </td>
              <td className=" ">Mike Smith</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$432.26</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="odd pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000037</td>
              <td className=" ">May 24, 2014 10:52:44 PM</td>
              <td className=" ">121000204</td>
              <td className=" ">Mike Smith</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$333.21</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="even pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000040</td>
              <td className=" ">May 24, 2014 11:47:56 PM </td>
              <td className=" ">121000210</td>
              <td className=" ">John Blank L</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$7.45</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="odd pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000039</td>
              <td className=" ">May 26, 2014 11:30:12 PM</td>
              <td className=" ">
                121000208 <i className="error fa fa-long-arrow-down"></i>
              </td>
              <td className=" ">John Blank L</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$741.20</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="even pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000038</td>
              <td className=" ">May 26, 2014 10:55:33 PM</td>
              <td className=" ">121000203</td>
              <td className=" ">Mike Smith</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$432.26</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="odd pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000037</td>
              <td className=" ">May 26, 2014 10:52:44 PM</td>
              <td className=" ">121000204</td>
              <td className=" ">Mike Smith</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$333.21</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>

            <tr className="even pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000040</td>
              <td className=" ">May 27, 2014 11:47:56 PM </td>
              <td className=" ">121000210</td>
              <td className=" ">John Blank L</td>
              <td className=" ">Paid</td>
              <td className="a-right a-right ">$7.45</td>
              <td className=" last">
                <span>View</span>
              </td>
            </tr>
            <tr className="odd pointer">
              <td className="a-center ">
                <input type="checkbox" className="flat" name="table_records" />
              </td>
              <td className=" ">121000039</td>
              <td className=" ">May 28, 2014 11:30:12 PM</td>
              <td className=" ">121000208</td>
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
  );
}

export default ProductPage;
