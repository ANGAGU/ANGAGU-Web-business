import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button, Row } from 'reactstrap';
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
  const [company, setCompany] = useState('회사' as string);
  const [toggle, setToggle] = useState(false as boolean);
  const [searchMonth, setSearchMonth] = useState('1월' as string);
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

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setSearchMonth(value);
  };

  return (
    <>
      <Container className="adjust-page">
        <div className="adjust-filter">
          <h5> 검색 </h5>
          <div className="filter-form">
            <div className="filter-form__content">
              {true ? <CompanyFilter selectCompanyFunc={setCompany} /> : <></>}
              <span className="content__ttl">정산 일자</span>
              <span>
                <Input
                  type="select"
                  name="month"
                  id="filter-month"
                  onChange={handleOnChange}
                >
                  {monthOptions}
                </Input>
              </span>
            </div>
            <Button>검색</Button>
          </div>
        </div>
        <div className="adjust-block">
          <div className="adjust-content">
            <div className="content__profit">
              <span className="company-name content-highlight">{company}</span>
              의
              <span className="adjust-month content-highlight">
                {searchMonth}
              </span>
              입금 금액은
              <span className="adjust-profit content-highlight">200000원</span>
              입니다.
            </div>
            <div className="content__profit-detail">
              총 매출 {`250000원`} - 수수료 {`50000원`}
            </div>
          </div>
          <Button
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            토글
          </Button>

          {toggle ? (
            <Table size="sm" className="product-profit-table">
              <thead>
                <tr>{productProfitHeader}</tr>
              </thead>

              <tbody>{productProfits}</tbody>
            </Table>
          ) : null}
        </div>
        <div className="adjust-block">
          <div className="adjust-content">
            <div className="content__profit">
              <span className="company-name content-highlight">Scanit</span>의
              <span className="adjust-month content-highlight">
                {searchMonth}
              </span>
              수익 수수료는
              <span className="adjust-profit content-highlight">200000원</span>
              입니다.
            </div>
            <div className="content__profit-detail">
              총 매출 {`250000원`} - 수수료 {`50000원`}
            </div>
          </div>
          <Button
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            토글
          </Button>

          {toggle ? (
            <Table size="sm" className="product-profit-table">
              <thead>
                <tr>{productProfitHeader}</tr>
              </thead>

              <tbody>{productProfits}</tbody>
            </Table>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default AdjustPageTemplate;
