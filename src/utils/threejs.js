import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const threeJs = {
  sceneSetup: canvasRef => {
    // get container dimensions and use them for scene sizing
    const width = canvasRef.mount.clientWidth;
    const height = canvasRef.mount.clientHeight;

    canvasRef.scene = new THREE.Scene();
    canvasRef.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000, // far plane
    );
    canvasRef.camera.position.z = 500; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    canvasRef.controls = new OrbitControls(canvasRef.camera, canvasRef.mount);
    canvasRef.renderer = new THREE.WebGLRenderer();
    canvasRef.renderer.setSize(width, height);
    canvasRef.mount.appendChild(canvasRef.renderer.domElement); // mount using React ref
  },
  loadTheModel: (model, canvasRef) => {
    // instantiate a loader
    const loader = new OBJLoader();

    // load a resource
    loader.load(
      // resource URL relative to the /public/index.html of the app
      model,
      // called when resource is loaded
      object => {
        canvasRef.scene.add(object);

        // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
        // you can always set console.log(canvasRef.scene) and check its children to know the name of a model
        const el = canvasRef.scene.getObjectByName('Elephant_4');

        // change some custom props of the element: placement, color, rotation, anything that should be
        // done once the model was loaded and ready for display
        el.position.set(0, -150, 0);
        el.material.color.set(0x50c878);
        el.rotation.x = 23.5;

        // make canvasRef element available inside of the whole component to do any animation later
        canvasRef.model = el;
      },
      // called when loading is in progresses
      xhr => {
        const loadingPercentage = Math.ceil((xhr.loaded / xhr.total) * 100);
        console.log(`${loadingPercentage}% loaded`);

        // update parent react component to display loading percentage
        canvasRef.props.onProgress(loadingPercentage);
      },
      // called when loading has errors
      error => {
        console.log(`An error happened: ${error}`);
      },
    );
  },
  addLights: canvasRef => {
    const lights = [];

    // set color and intensity of lights
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    // place some lights around the scene for best looks and feel
    lights[0].position.set(0, 2000, 0);
    lights[1].position.set(1000, 2000, 1000);
    lights[2].position.set(-1000, -2000, -1000);

    canvasRef.scene.add(lights[0]);
    canvasRef.scene.add(lights[1]);
    canvasRef.scene.add(lights[2]);
  },

  startAnimationLoop: canvasRef => {
    // slowly rotate an object
    if (canvasRef.model) canvasRef.model.rotation.z += 0.005;

    canvasRef.renderer.render(canvasRef.scene, canvasRef.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    canvasRef.requestID = window.requestAnimationFrame(canvasRef.startAnimationLoop);
  },

  handleWindowResize: canvasRef => {
    const width = canvasRef.mount.clientWidth;
    const height = canvasRef.mount.clientHeight;

    canvasRef.renderer.setSize(width, height);
    canvasRef.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    canvasRef.camera.updateProjectionMatrix();
  },
};

export default threeJs;
