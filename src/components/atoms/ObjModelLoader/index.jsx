/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-else-return */
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three-stdlib';
import { Suspense, useState, useEffect } from 'react';

import model1 from '../../../assets/modernobj.obj';
import mesh from '../../../assets/IKE050020.mtl';

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({ model }) => {
  const [model3D, setModel] = useState(null);
  useEffect(() => {
    setModel(model);
  }, []);
  console.log('scene', model3D);
  const materials = useLoader(MTLLoader, mesh);
  const obj = useLoader(OBJLoader, model3D, loader => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} scale={1} position={[0, -1, 0]} />;
};

const ObjModelLoader = ({ model, mtl }) => {
  const [model3D, setModel3D] = useState(null);
  useEffect(() => {
    setModel3D(model);
    console.log('loader', model1);
  }, []);
  return (
    <div className="App" style={AppStyle}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          {model3D && <Scene model={model3D} />}
          <OrbitControls />
          <ambientLight />
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
    </div>
  );
};
const AppStyle = {
  height: '700px',
  width: '100%',
};
export default ObjModelLoader;
