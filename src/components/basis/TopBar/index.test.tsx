import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import TopBar from './index';
import TopBarLibs from './libs';

let container: HTMLElement;
const TopBarProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleSidebar: () => {},
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

describe('TopBar Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <TopBar toggleSidebar={TopBarProps.toggleSidebar}/>
        </Router>,
        container,
      );
    });
  });

  it('logout function test', () => {
    localStorage.setItem('isAdmin', 'true');
    const spyFn = jest.spyOn(TopBarLibs, 'Logout');
    TopBarLibs.Logout();
    expect(spyFn).toBeCalledTimes(1);
    expect(localStorage.getItem('isAdmin')).toBe(null);
    // 잘 로그아웃 되었나?
  });
});
