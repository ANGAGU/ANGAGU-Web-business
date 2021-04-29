import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Container, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { CompanyFilter } from '../../molecules';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};
type Adjust = {
  id: number;
  company: string;
  term: string;
  fee: string;
  totalRevenue: string;
  profit: string;
};
const AdjustPage: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  const [adjustDummyData] = useState(Dummy.makeAdjusts(1) as Array<Adjust>);

  // methods
  const requestAdjust = async () => {
    // const result = api.post('send adjust api', {});
  };

  const adjustHeader = adjustTitleList.map(ttl => (
    <th className="column-title">{ttl}</th>
  ));

  // 추후 기간 검색 결과로 한줄만 띄울 예정
  // 아래 상세 목록 토글 추가? => 여유될 경우
  const adjusts = adjustDummyData.map((adjust, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? 'even pointer' : 'odd pointer'}
    >
      <td className="a-center">
        <input type="checkbox" className="flat" name="table_records" />
      </td>
      <td>{`${adjust.id}`}</td>
      <td>{`${adjust.company}`}</td>
      <td>{`${adjust.term}`}</td>
      <td>
        {adjust.totalRevenue} <i className="success fa fa-long-arrow-up" />
      </td>
      <td>{adjust.fee}</td>
      <td>{adjust.profit}</td>
    </tr>
  ));

  const monthOptions = monthList.map((month, index) => (
    <option key={index}>{month}</option>
  ));

  return (
    <>
      <Container className="adjust-page">
        <div className="adjust-filter">
          <h5> 검색 </h5>
          <div className="filter-form">
            {true ? <CompanyFilter isAdmin /> : <></>}

            <div className="filter-form__content">
              <span className="content__ttl">정산 일자</span>
              <span>
                <Input type="select" name="month" id="filter-month">
                  {monthOptions}
                </Input>
              </span>
            </div>
          </div>
        </div>
        <div>
          <Table className="table table-striped jambo_table bulk_action">
            <thead>
              <tr className="headings">{adjustHeader}</tr>
            </thead>

            <tbody>{adjusts}</tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default AdjustPage;
