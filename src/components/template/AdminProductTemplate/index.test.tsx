import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import AdminProductTemplate from './index';

let container: HTMLElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

describe('AdminProductTemplate Component', () => {
  it('renders component', () => {
    act(() => {
      render(<AdminProductTemplate />, container);
    });
  });
});
