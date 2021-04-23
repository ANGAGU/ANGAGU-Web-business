import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Dummy } from 'utils';
import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};
type Adjust = {
  term: string;
  adjustDate: string;
  state: string;
  profit: string;
};
const AdjustPage: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  const [adjustDummyData] = useState(Dummy.makeAdjusts(10) as Array<Adjust>);
  const adjustTitleList = [
    '',
    '분기',
    '기간',
    '정산날짜',
    '매출',
    '정산상태',
    '정산요청',
  ];
  const adjustHeader = adjustTitleList.map(ttl => (
    <th className="column-title">{ttl}</th>
  ));
  const adjusts = adjustDummyData.map((adjust, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? 'even pointer' : 'odd pointer'}
    >
      <td className="a-center">
        <input type="checkbox" className="flat" name="table_records" />
      </td>
      <td className=" ">{`${index}분기`}</td>
      <td className=" ">
        {adjust.term} <i className="success fa fa-long-arrow-up" />
      </td>
      <td className=" ">{adjust.adjustDate}</td>
      <td className=" ">{adjust.profit}</td>
      <td className=" ">{adjust.state}</td>
      <td className="last">
        <Button color="secondary">정산요청</Button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="adjust-page">
        <div className="x_content">
          <div className="table-responsive">
            <Table className="table table-striped jambo_table bulk_action">
              <thead>
                <tr className="headings">{adjustHeader}</tr>
              </thead>

              <tbody>{adjusts}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdjustPage;
