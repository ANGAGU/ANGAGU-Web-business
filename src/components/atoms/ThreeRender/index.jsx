/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import MoonLoader from 'react-spinners/MoonLoader';
import { css } from '@emotion/react';

function useResponsiveCanvas(initialSize) {
  const canvasRef = useRef();
  const mountRef = useRef();
  const [size, setSize] = useState([0, 0]);

  // set initial svg and size
  useEffect(() => {
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

function main(div, url, size, fileExtention, _modelTexture) {
  const canvas = document.createElement('canvas');
  const [getWidth, getHeight] = size;
  canvas.width = div.offsetWidth;
  canvas.height = div.offsetHeight;
  canvas.style.display = 'block';
  div.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  // const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 20, 50);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

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
    switch (fileExtention) {
      case 'obj':
        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();
        mtlLoader.load(`http://d3u3zwu9bmcdht.cloudfront.net/${_modelTexture[0]}`, materials => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.load(url, object => {
            let box = new THREE.Box3().setFromObject(object);
            let scale = 0.1;
            if (box.max.x >= box.max.y && box.max.x >= box.max.z) {
              scale = 20 / box.max.x;
            } else if (box.max.y >= box.max.x && box.max.y >= box.max.z) {
              scale = 20 / box.max.y;
            } else if (box.max.z >= box.max.y && box.max.z >= box.max.x) {
              scale = 20 / box.max.z;
            }

            object.scale.set(scale, scale, scale);
            object.position.set(0, 0, 0);
            scene.add(object);
          });
        });
        break;
      case 'fbx':
        const fbxLoader = new FBXLoader();
        fbxLoader.load(url, function (object) {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          scene.add(object);
        });
        break;
      case 'dae':
        const daeLoader = new ColladaLoader();
        // DAELoader.options.convertUpAxis = true;
        daeLoader.load(url, collada => {
          collada.scene.scale.set(1, 1, 1);
          scene.add(collada.scene);
        });
        break;
      case '3ds':
        const normal = new THREE.TextureLoader().load(
          `http://d3u3zwu9bmcdht.cloudfront.net/${_modelTexture[0]}`,
        );
        const tdsLoader = new TDSLoader();
        tdsLoader.setResourcePath('models/3ds/portalgun/textures/');
        tdsLoader.load(url, function (object) {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.material.specular.setScalar(1);
              child.material.normalMap = normal;
            }
          });
          object.position.set(0, 5, 0);
          scene.add(object);
        });
        break;
    }
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

function ThreeRender({ size: initialSize, modelURL, modelEx, modelTexture }) {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ff00ff');
  const mountRef = useRef();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    main(mountRef.current, modelURL, initialSize, modelEx, modelTexture);
  }, []);
  return (
    <div
      style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}
      ref={mountRef}
    />
  );
}

export default ThreeRender;
