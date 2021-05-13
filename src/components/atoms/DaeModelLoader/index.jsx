import React, { useState, useReducer, useEffect } from 'react';
import { MTLModel, DAEModel, DirectionLight } from 'react-3d-viewer';

const DaeModel = ({ model }) => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const onLoadModel = () => {
    forceUpdate();
    console.log('render');
  };
  useEffect(() => {
    console.log('first render');
  }, [ignored]);
  return (
    <div>
      <DAEModel src={model} width={700} height={500} onLoad={onLoadModel}>
        <DirectionLight color={0xff00ff} />
      </DAEModel>
    </div>
  );
};

export default DaeModel;
