import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './index';

let container: HTMLElement;
// eslint-disable-next-line no-undef
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

// eslint-disable-next-line no-undef
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

// eslint-disable-next-line no-undef
describe('Main Page', () => {
  // eslint-disable-next-line no-undef
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <Main />
        </Router>,
        container,
      );
    });
  });
});
