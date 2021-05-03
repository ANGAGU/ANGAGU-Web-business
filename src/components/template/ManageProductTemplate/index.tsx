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
import { ManageProductTable } from '../../organisms';
import './style.css';

const ManageOrderTemplate: React.FC = () => {
  return <ManageProductTable />;
};

export default ManageOrderTemplate;
