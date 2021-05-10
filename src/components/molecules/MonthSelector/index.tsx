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
  const [maxDate, setMaxDate] = useState('' as string);
  // methods

  useEffect(() => {
    getCurrentDate();
  }, []);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    let tempDate = '';
    if (month < 10) tempDate = `${year}-0${month}`;
    else tempDate = `${year}-${month}`;

    setDate(tempDate);
    setMaxDate(tempDate);
    console.log('max:', date);
  };

  const string2Date = (value: string) => {
    const year = parseInt(value.substr(0, 4), 10);
    const month = parseInt(value.substr(5, 2), 10);
    return new Date(year, month - 1);
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
