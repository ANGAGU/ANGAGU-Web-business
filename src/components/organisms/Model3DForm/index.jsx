import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, FormGroup, Label, Input, Container, Row } from 'reactstrap';
import * as THREE from 'three';
import './style.css';
import { OBJModel } from 'react-3d-viewer';
import { ModalMol, Modal3D } from '../../molecules';
import model from './Koltuk.obj';
import api from '../../../api';

const Model3DForm = () => {
  return (
    <div className="product-3d-model">
      <h4>상품 3D 모델</h4>
      <Modal3D />
    </div>
  );
};

export default Model3DForm;
