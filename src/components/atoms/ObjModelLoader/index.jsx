/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ObjModelLoader = ({ model3D }) => {
  const canvasRef = useRef(null);
  let width;
  let height;
  let scene;
  let camera;
  let renderer;
  let controls;
  let loader;
  let model;
  let requestId;

  useEffect(() => {
    console.log(model3D);
    sceneSetup();
    addLights();
    loadTheModel(model3D);
    startAnimationLoop(requestId);
    window.addEventListener('resize', handleWindowResize);
    return function cleanup() {
      window.removeEventListener('resize', handleWindowResize);
      window.cancelAnimationFrame();
      controls.dispose();
    };
  }, []);
  const sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    width = 700;
    height = 500;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000, // far plane
    );
    camera.position.z = 500; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    renderer = new THREE.WebGLRenderer();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement); // mount using React ref
  };

  // Code below is taken from Three.js OBJ Loader example
  // https://threejs.org/docs/#examples/en/loaders/OBJLoader
  const loadTheModel = _model => {
    console.log(_model);
    // instantiate a loader
    loader = new OBJLoader();

    // load a resource
    loader.load(
      // resource URL relative to the /public/index.html of the app
      _model,
      // called when resource is loaded
      object => {
        scene.add(object);

        // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
        // you can always set console.log(this.scene) and check its children to know the name of a model
        // const el = scene.getObjectByName('3d model');
        console.log(scene);
        // const el = object;

        // // change some custom props of the element: placement, color, rotation, anything that should be
        // // done once the model was loaded and ready for display
        // el.position.set(0, -150, 0);
        // el.material.color.set(0x50c878);
        // el.rotation.x = 23.5;

        // // make this element available inside of the whole component to do any animation later
        // model = el;
      },
      // called when loading is in progresses
      xhr => {
        // update parent react component to display loading percentage
        // this.props.onProgress(loadingPercentage);
      },
      // called when loading has errors
      error => {
        console.log(`An error happened:${error}`);
      },
    );
  };

  // adding some lights to the scene
  const addLights = () => {
    const lights = [];

    // set color and intensity of lights
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    // place some lights around the scene for best looks and feel
    lights[0].position.set(0, 2000, 0);
    lights[1].position.set(1000, 2000, 1000);
    lights[2].position.set(-1000, -2000, -1000);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
  };

  const startAnimationLoop = _requestID => {
    // slowly rotate an object
    // if (canvasRef.current.model) canvasRef.current.model.rotation.z += 0.005;
    controls.update();
    renderer.render(scene, camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    _requestID = window.requestAnimationFrame(startAnimationLoop);
  };
  const handleWindowResize = () => {
    // width = canvasRef.current.mount.clientWidth;
    // height = canvasRef.current.mount.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    camera.updateProjectionMatrix();
  };

  return <div style={style} ref={canvasRef} />;
};

const style = {
  height: 500, // we can control scene size by setting container dimensions
  textAlign: 'center',
  width: '100%',
  maxWidth: '800px',
  borderRadius: '5px',
  overflow: 'hidden',
  marginBottom: '20px',
};

export default ObjModelLoader;
