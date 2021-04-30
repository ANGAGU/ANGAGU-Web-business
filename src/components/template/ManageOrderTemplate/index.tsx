import React, { useEffect, useState } from 'react';
import {
  Jumbotron,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { OrderTable } from '../../organisms';
import './style.css';

const ManageOrderTemplate: React.FC = () => {
  return <OrderTable />;
};

export default ManageOrderTemplate;
