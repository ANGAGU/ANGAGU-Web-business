import React from 'react';
import './style.css';
import { Modal3D } from '../../molecules';

const Model3DForm = () => {
  return (
    <div className="product-3d-model">
      <h4>상품 3D 모델</h4>
      <Modal3D />
    </div>
  );
};

export default Model3DForm;
