import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ManageRegister from './libs';

import ManageProductTable from './index';

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

describe('ManageProductTable Component', () => {
  it('renders component', () => {
    act(() => {
      render(<ManageProductTable />, container);
    });
  });

});
