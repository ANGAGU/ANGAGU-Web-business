import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ModalMol from './index';

let container: HTMLElement;

const ModalItemProps = {
  buttonLabel: 'test',
  className: 'test',
  content: 'test'
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
        <ModalMol
          buttonLabel={ModalItemProps.buttonLabel}
          className={ModalItemProps.className}
          content={ModalItemProps.content}
        />,
        container,
      );
    });
  });
});
