import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Dummy } from 'utils';
import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};
type Adjust = {
  id: number;
  term: string;
  fee: string;
  totalRevenue: string;
  profit: string;
};
const AdjustPage: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  const [adjustDummyData] = useState(Dummy.makeAdjusts(10) as Array<Adjust>);
  const adjustTitleList = [
    '',
    '정산번호',
    '기간',
    '총매출',
    '수수료',
    '최종정산금액',
  ];

  // methods
  const requestAdjust = async () => {
    // const result = api.post('send adjust api', {});
  };

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
      <td className=" ">{`${adjust.id}`}</td>
      <td className=" ">{`${adjust.term}`}</td>
      <td className=" ">
        {adjust.totalRevenue} <i className="success fa fa-long-arrow-up" />
      </td>
      <td className=" ">{adjust.fee}</td>
      <td className=" ">{adjust.profit}</td>
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
