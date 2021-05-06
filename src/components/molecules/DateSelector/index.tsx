import api from 'api';
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Input } from 'reactstrap';
import { Dummy } from 'utils';
import { adjustTitleList, monthList } from '../../../commons/constants/string';
import './style.css';

type DateSelectorProps = {
  selectDateFunc: React.Dispatch<React.SetStateAction<string>>;
};
const DateSelector: React.FC<DateSelectorProps> = ({ selectDateFunc }) => {
  const [date, setDate] = useState('' as string);

  // methods

  useEffect(() => {
    getCurrentDate();
  });
  const getCurrentDate = () => {};

  return (
   
  );
};

export default DateSelector;
