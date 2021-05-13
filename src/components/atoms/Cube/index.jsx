import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DDSLoader } from 'three-stdlib';
import { Suspense } from 'react';
import model1 from '../../../assets/modernobj.obj';
import mesh from '../../../assets/modernobj.mtl';

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = ({ model, mtl }) => {
  console.log(model);
  const materials = useLoader(MTLLoader, mesh);

  const obj = useLoader(OBJLoader, model1, loader => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} scale={0.04} position={[0, -1, 0]} />;
};

const Cube = ({ model, mtl }) => {
  return (
    <div className="App" style={AppStyle}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene model={model} mtl={mtl} />
          <OrbitControls />
          <ambientLight />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
    </div>
  );
};
const AppStyle = {
  height: '700px',
  width: '800px',
};
export default Cube;
