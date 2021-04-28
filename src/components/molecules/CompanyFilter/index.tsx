import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type CompanyFilterProps = {
  isAdmin: boolean;
};
type Adjust = {
  id: number;
  term: string;
  fee: string;
  totalRevenue: string;
  profit: string;
};
const CompanyFilter: React.FC<CompanyFilterProps> = ({ isAdmin }) => {
  const [company, setCompany] = useState('' as string);
  // const [companyList, setCompanyList] = useState([] as Array<string>);
  const [filteredList, setFilteredList] = useState([] as Array<string>);

  // 임시
  const companyList = [
    '회사',
    '탐사수',
    'abc',
    '딸기',
    '젤리',
    '토스트',
    '디퓨저',
    '사과',
    '애플펜슬',
    '무민',
    '리라쿠마',
    '토깽이',
    '마스크',
    'bluepen',
  ];

  // methods
  const requestAdjust = async () => {
    // const result = api.post('send adjust api', {});
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    const result = companyList.filter(name => name.includes(value));
    setFilteredList(result);
  };

  return (
    <div className="filter-form__content">
      <span className="content__ttl">회사명</span>
      <span>
        <Input
          type="text"
          name="companyName"
          id="filter__company-name"
          value={company}
          onChange={handleOnChange}
        />
      </span>
      {filteredList}
    </div>
  );
};

export default CompanyFilter;
