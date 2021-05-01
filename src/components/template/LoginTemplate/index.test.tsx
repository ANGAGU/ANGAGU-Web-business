import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginTemplate from './index';

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

describe('LoginForm Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <Router>
          <LoginTemplate />
        </Router>,
        container,
      );
    });
  });

  // it('renders user data', async () => {
  //   const fakeUser = {
  //     id: 'test',
  //     pw: 'test',
  //   };
  //   jest.spyOn(LoginTemplate, 'getLogin').mockImplementation(() => {
  //     return Promise.resolve({
  //       json: () => Promise.resolve(fakeUser),
  //     });
  //   });
  // });
});
