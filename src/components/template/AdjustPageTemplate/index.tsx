import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Container, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { CompanyFilter } from '../../molecules';
import {
  adjustTitleList,
  projuctProfitTitleList,
  monthList,
} from '../../../commons/constants/string';
import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};
type Adjust = {
  id: number;
  company: string;
  term: string;
  commission: string;
  revenue: string;
  profit: string; // revenue - commission
};

type ProductProfit = {
  id: number;
  name: string;
  price: string;
  commission: string;
  revenue: string;
  profit: string; // revenue - commission
  sellCount: number;
};
const AdjustPageTemplate: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  const [adjustsDummy] = useState(Dummy.makeAdjusts(1) as Array<Adjust>);
  const [productProfitsDummy] = useState(
    Dummy.makeProductProfits(10) as Array<ProductProfit>,
  );

  // methods
  const requestAdjust = async () => {
    // const result = api.post('send adjust api', {});
  };

  const adjustHeader = adjustTitleList.map(ttl => (
    <th className="column-title">{ttl}</th>
  ));
  const productProfitHeader = projuctProfitTitleList.map(ttl => (
    <th className="column-title">{ttl}</th>
  ));

  // index key 추후 id로 대체
  const productProfits = productProfitsDummy.map((product, index) => (
    <tr key={index}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.sellCount}</td>
      <td>{product.profit}</td>
    </tr>
  ));
  // 추후 기간 검색 결과로 한줄만 띄울 예정
  // 아래 상세 목록 토글 추가? => 여유될 경우
  const adjusts = adjustsDummy.map((adjust, index) => (
    <tr key={index}>
      <td>
        <input type="checkbox" name="table_records" />
      </td>
      <td>{`${adjust.id}`}</td>
      <td>{`${adjust.company}`}</td>
      <td>{`${adjust.term}`}</td>
      <td>
        {adjust.revenue} <i />
      </td>
      <td>{adjust.commission}</td>
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
          <Table>
            <thead>
              <tr className="headings">{adjustHeader}</tr>
            </thead>

            <tbody>{adjusts}</tbody>
          </Table>
        </div>
        <div>
          <Table size="sm" className="product-profit-table">
            <thead>
              <tr>{productProfitHeader}</tr>
            </thead>

            <tbody>{productProfits}</tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default AdjustPageTemplate;
