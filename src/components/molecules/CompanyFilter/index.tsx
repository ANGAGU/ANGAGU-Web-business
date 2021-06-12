import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import './style.css';

type CompanyFilterProps = {
  selectCompanyFunc: React.Dispatch<React.SetStateAction<string>>;
};
const CompanyFilter: React.FC<CompanyFilterProps> = ({ selectCompanyFunc }) => {
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
    if (result.length === 0) setFilteredList(['검색결과가 없습니다.']);
    else setFilteredList(result);
  };
  const selectCompany = (value: string) => {
    setCompany(value);
    selectCompanyFunc(value);
  };
  return (
    <div className="filter-form__content">
      <span className="content__ttl">회사명</span>
      <div className="content__input">
        <Input
          autoComplete="off"
          alt="company-name-input"
          type="text"
          name="companyName"
          id="filter__company-name"
          value={company}
          placeholder="회사 검색"
          onChange={handleOnChange}
          onFocus={() => setViewList(true)}
          onBlur={() => setViewList(false)}
        />
        <ul className={viewList ? 'result-list' : 'result-list result-list--hidden'}>
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
