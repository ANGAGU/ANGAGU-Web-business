import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import RegisterBusin from './index';

let container = null;
const RegisterBusinData = {
  buttonLabel: '사업자 등록',
  classname: 'register',
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
  container = null;
});

describe('RegisterBusin Page', () => {
  it('renders', () => {
    act(() => {
      render(
        <RegisterBusin
          buttonLabel={RegisterBusinData.buttonLabel}
          classname={RegisterBusinData.classname}
        />,
        container,
      );
    });
  });
});
