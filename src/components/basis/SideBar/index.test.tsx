import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './index';

let container: HTMLElement;

const SideBarProps = {
  isOpen: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
  menu: [],
};
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

describe('SideBar Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <SideBar isOpen={SideBarProps.isOpen} toggle={SideBarProps.toggle} menu={SideBarProps.menu} />
        </Router>,
        container,
      );
    });
  });
});
