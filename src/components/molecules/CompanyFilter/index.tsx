import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type CompanyFilterProps = {
  isAdmin: boolean;
};
const CompanyFilter: React.FC<CompanyFilterProps> = ({ isAdmin }) => {
  const [company, setCompany] = useState('' as string);
  // const [companyList, setCompanyList] = useState([] as Array<string>);
  const [filteredList, setFilteredList] = useState([] as Array<string>);
  const [viewList, setViewList] = useState(false as boolean);

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
    '이름이 짱짱 긴 회사에요오오',
  ];

  // methods

  useEffect(() => {
    getCompanies();
  });
  const getCompanies = async () => {
    // const result = api.post('send adjust api', {});
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    setCompany(value);

    const result = companyList.filter(name => name.includes(value));
    console.log(result);
    if (result.length === 0) setFilteredList(['검색결과가 없습니다.']);
    else setFilteredList(result);
  };
  const selectCompany = (value: string) => {
    setCompany(value);
  };
  return (
    <div className="filter-form__content">
      <span className="content__ttl">회사명</span>
      <div className="content__input">
        <Input
          autoComplete="off"
          type="text"
          name="companyName"
          id="filter__company-name"
          value={company}
          placeholder="회사 검색"
          onChange={handleOnChange}
          onFocus={() => setViewList(true)}
          onBlur={() => setTimeout(() => setViewList(false), 100)}
        />
        <ul className={viewList ? 'result-list' : 'result-list--hiddem'}>
          {filteredList.map((el, index) => (
            <li
              className={
                filteredList.length !== index + 1
                  ? 'result-list__item'
                  : 'result-list__item result-list__item--last'
              }
              onClick={() => selectCompany(el)}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyFilter;
