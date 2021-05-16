import React from 'react';
import './style.css';
import { View3DModal } from '../../molecules';

const Model3DForm = ({ pid }) => {
  return (
    <div className="product-3d-model">
      <View3DModal pid={pid} />
    </div>
  );
};

export default Model3DForm;
