/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/no-this-in-sfc */
import { RoomTwoTone } from '@material-ui/icons';
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import mesh1 from '../../assets/IKEA-MINUT_Lampadaire-3D.mtl';
import ObjModelLoader from './ObjModelLoader';
// import model1 from '../../assets/IKEA-Frosta_Stool-3D.obj';

function useResponsiveCanvas(initialSize) {
  const canvasRef = useRef();
  const mountRef = useRef();
  const [size, setSize] = useState([0, 0]);

  // set initial svg and size
  useEffect(() => {
    console.log(initialSize);
    const canvas = document.createElement('canvas');
    const mount = mountRef.current;
    canvas.style.display = 'block';
    canvasRef.current = canvas;

    // update initial size
    let width = 0;
    let height = 0;
    if (initialSize !== undefined) {
      // Use initialSize if it is provided
      [width, height] = initialSize;
    } else {
      // Use parentElement size if resized has not updated
      width = mount.offsetWidth;
      height = mount.offsetHeight;
    }
    setSize([width, height]);

    // update resize using a resize observer
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || !entries.length) {
        return;
      }
      if (initialSize === undefined) {
        let { width, height } = entries[0].contentRect;
        setSize([width, height]);
      }
    });
    resizeObserver.observe(mount);
    console.log(mount.children);
    mount.appendChild(canvas);

    // cleanup
    return () => {
      resizeObserver.unobserve(mount);
      mount.removeChild(canvas);
    };
  }, [initialSize]);
  return {
    canvas: canvasRef.current,
    mountRef,
    size,
  };
}
function main(div, url, size, fileName) {
  const canvas = document.createElement('canvas');
  const [getWidth, getHeight] = size;
  canvas.width = getWidth;
  canvas.height = getHeight;
  canvas.style.display = 'block';
  div.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 50);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  // {
  //   const planeSize = 60;

  //   const loader = new THREE.TextureLoader();
  //   const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   texture.magFilter = THREE.NearestFilter;
  //   const repeats = planeSize / 2;
  //   texture.repeat.set(repeats, repeats);

  //   const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  //   const planeMat = new THREE.MeshPhongMaterial({
  //     map: texture,
  //     side: THREE.DoubleSide,
  //   });
  //   const mesh = new THREE.Mesh(planeGeo, planeMat);
  //   mesh.rotation.x = Math.PI * -0.5;
  //   scene.add(mesh);
  // }

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    // const color = 0xdddddd;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    // const mtlLoader = new MTLLoader();
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load('../../assets/stool/plywood_diff_1k.jpg');
    // const objMat = new THREE.MeshPhongMaterial({
    //   map: texture,
    //   side: THREE.DoubleSide,
    // });
    // const objLoader = new OBJLoader();
    // objLoader.setMaterials(objMat);
    // objLoader.load(url, object => {
    //   object.scale.set(0.006, 0.006, 0.006);
    //   object.position.set(0.3, 0.3, 0.3);
    //   scene.add(object);
    // });
    // const textureLoader = new THREE.TextureLoader();
    // const mapTex = textureLoader.load('../../assets/stool/open3dmodel_com_wooden__4.jpg');
    // const material = new THREE.MeshPhongMaterial({ map: mapTex });
    // const objLoader = new OBJLoader();
    // // objLoader.setMaterials(mtl);
    // objLoader.load(url, object => {
    //   // var texture = new THREE.TextureLoader().load('../../assets/stool/open3dmodel_com_wooden__4.jpg');
    //   object.traverse(function (child) {
    //     // aka setTexture
    //     if (child.isMesh) {
    //       child.material = material;
    //     }
    //   });
    //   object.scale.set(0.006, 0.006, 0.006);
    //   object.position.set(0.3, 0.3, 0.3);
    //   scene.add(object);
    // });
    // const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load('../../assets/stool/open3dmodel_com_wooden__4.jpg');
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    mtlLoader.load(mesh1, materials => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load(url, object => {
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, -3, 0);
        scene.add(object);
      });
    });
    // objLoader.load(url, function (object) {
    //   object.traverse(obj => {
    //     console.log(obj.isMesh);
    //     if (obj.isMesh) obj.material.color.set(0xffb6c1);
    //   });
    //   // object.position.y = -95;
    //   object.scale.set(0.02, 0.02, 0.02);
    //   object.position.set(0.3, 0.3, 0.3);
    //   scene.add(object);
    // });

    // const DAELoader = new ColladaLoader();
    // // DAELoader.options.convertUpAxis = true;
    // DAELoader.load(url, collada => {
    //   collada.scene.scale.set(1, 1, 1);
    //   scene.add(collada.scene);
    // });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
function ThreeRender({ size: initialSize, modelURL, modelName }) {
  const [width, height] = initialSize;
  const mountRef = useRef();
  useEffect(() => {
    main(mountRef.current, modelURL, initialSize, modelName);
  }, []);
  return <div style={{ height: '100%', width: '100%' }} ref={mountRef} />;
}
export default ThreeRender;
