import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Input } from 'reactstrap';
import { Dummy, string2Date, date2String } from 'utils';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type MonthSelectorProps = {
  title: string;
  selectDateFunc: React.Dispatch<React.SetStateAction<Date>>;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectDateFunc, title }) => {
  const [date, setDate] = useState('' as string);
  const [maxDate, setMaxDate] = useState('' as string);
  // methods

  useEffect(() => {
    getCurrentDate();
  }, []);
  const getCurrentDate = () => {
    const today = new Date();
    const curDate = date2String(today);
    setDate(curDate);
    setMaxDate(curDate);
    console.log('max:', date);
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setDate(value);
    selectDateFunc(string2Date(value));
  };

  return (
    <div className="filter-form__content">
      <span className="content__ttl">{title}</span>
      <span>
        <Input
          type="month"
          value={date}
          min="2020-01"
          max={maxDate}
          name="date"
          id="select-month"
          onChange={handleOnChange}
        />
      </span>
    </div>
  );
};

export default MonthSelector;
