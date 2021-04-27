import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import OrderTable from './index';

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

describe('OrderTable Component', () => {
  it('renders component', () => {
    act(() => {
      render(<OrderTable />, container);
    });
  });
});
