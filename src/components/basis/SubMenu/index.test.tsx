import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import SubMenu from './index';

let container: HTMLElement;
const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Home 2',
      target: 'Home-2',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: 'Page 1',
      target: 'Page-1',
    },
    {
      title: 'Page 2',
      target: 'Page-2',
    },
  ],
];

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

describe('SubMenu Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <SubMenu title="Home" icon={faHome} items={submenus[0]} />
        </Router>,
        container,
      );
    });
  });
});
