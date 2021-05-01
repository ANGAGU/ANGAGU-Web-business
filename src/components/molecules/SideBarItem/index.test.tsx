import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBarItem from './index';

let container: HTMLElement;

const SideBarItemProps = {
  url: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  title: '',
  icon : ''
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

describe('SideBarItem Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <SideBarItem
            url={SideBarItemProps.url}
            title={SideBarItemProps.title}
            icon={SideBarItemProps.icon}
          />
        </Router>,
        container,
      );
    });
  });
});
