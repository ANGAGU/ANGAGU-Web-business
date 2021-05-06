import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type MonthSelectorProps = {
  title: string;
  selectDateFunc: React.Dispatch<React.SetStateAction<Date>>;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectDateFunc,
  title,
}) => {
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState('' as string);

  // methods

  useEffect(() => {
    getCurrentDate();
  });
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    console.log(`${year}-${month}`);
    if (month < 10) setDate(`${year}-0${month}`);
    else setDate(`${year}-${month}`);
  };
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    console.log(value);
  };

  return (
    <div className="filter-form__content">
      <span className="content__ttl">정산 일자</span>
      <span>
        <Input
          type="month"
          value={date}
          name="date"
          id="select-month"
          onChange={handleOnChange}
        />
      </span>
    </div>
  );
};

export default MonthSelector;
