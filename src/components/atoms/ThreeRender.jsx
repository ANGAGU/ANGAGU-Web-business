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
function main(div, url, size) {
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
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 50);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const objLoader = new OBJLoader();
    // objLoader.load('http://d3u3zwu9bmcdht.cloudfront.net/testModel/modernchair11obj.obj', root => {
    //   scene.add(root);
    // });
    objLoader.load(url, root => {
      const geometry = root.content;
      const material = new THREE.MeshPhongMaterial({
        ambient: 0xff5533,
        color: 0xff5533,
        specular: 0x111111,
        shininess: 200,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      // URL.revokeObjectURL(url);
    });
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

function ThreeRender({ size: initialSize, modelURL }) {
  // const { canvas, mountRef, size } = useResponsiveCanvas(initialSize);
  const [width, height] = initialSize;
  const mountRef = useRef();
  // console.log(modelURL.substring(5));
  // const fov = 45;
  // const aspect = 2; // the canvas default
  // const near = 0.1;
  // const far = 100;
  // const skyColor = 0xb1e1ff; // light blue
  // const groundColor = 0xb97a20; // brownish orange
  // const color = 0xffffff; // for directionalLight
  // const intensity = 1;

  // const rendererRef = useRef(new THREE.WebGLRenderer({ canvas }));
  // const cameraRef = useRef(new THREE.PerspectiveCamera(fov, aspect, near, far));
  // const sceneRef = useRef(new THREE.Scene());
  // const hemisLightRef = useRef(new THREE.HemisphereLight(skyColor, groundColor, intensity));
  // const directionalLightRef = useRef(new THREE.DirectionalLight(color, intensity));
  // const objLoaderRef = useRef(new OBJLoader());
  // // const controlsRef = useRef(new OrbitControls(cameraRef.current, canvas));

  // // init globe
  // useEffect(() => {
  //   // get current instances
  //   const mount = mountRef.current;
  //   const renderer = rendererRef.current;
  //   const camera = cameraRef.current;
  //   const scene = sceneRef.current;
  //   const hemisLight = hemisLightRef.current;
  //   const directionalLight = directionalLightRef.current;
  //   const objLoader = objLoaderRef.current;
  //   // const controls = controlsRef.current;

  //   // set camera
  //   camera.position.set(0, 10, 20);

  //   // set light
  //   scene.add(hemisLight);
  //   scene.add(directionalLight);

  //   // get obj object file
  //   objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', root => {
  //     scene.add(root);
  //   });

  //   // set controls
  //   const controls = new OrbitControls(cameraRef.current, canvas);
  //   controls.target.set(0, 5, 0);
  //   controls.update();

  //   function resizeRendererToDisplaySize(_renderer) {
  //     const _canvas = _renderer.domElement;
  //     const _width = _canvas.clientWidth;
  //     const _height = _canvas.clientHeight;
  //     const _needResize = _canvas.width !== _width || _canvas.height !== _height;
  //     if (_needResize) {
  //       _renderer.setSize(_width, _height, false);
  //     }
  //     return _needResize;
  //   }
  //   // set update function to transform the scene and view
  //   function render() {
  //     if (resizeRendererToDisplaySize(renderer)) {
  //       const _canvas = renderer.domElement;
  //       camera.aspect = _canvas.clientWidth / _canvas.clientHeight;
  //       camera.updateProjectionMatrix();
  //     }
  //     renderer.render(scene, camera);
  //     requestAnimationFrame(render);
  //   }

  //   // update scene
  //   scene.add(camera);

  //   // mount element and animate
  //   mount.appendChild(renderer.domElement);
  //   requestAnimationFrame(render);
  // }, [mountRef]);

  // // update size
  // useEffect(() => {
  //   const renderer = rendererRef.current;
  //   renderer.setSize(width, height);
  // }, [height, width]);

  useEffect(() => {
    // main(mountRef.current, modelURL.substring(5), initialSize);
    main(mountRef.current, modelURL, initialSize);
  }, []);
  return <div style={{ height: '100%', width: '100%' }} ref={mountRef} />;
}
export default ThreeRender;
