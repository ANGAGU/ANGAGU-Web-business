import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PureModal from './index';

let container: HTMLElement;

const ModalItemProps = {
  buttonLabel: 'test',
  className: 'test',
  confirmButtonText: 'test',
  name: 'test',
  title: 'test',
  content: <div>test</div>,
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
        <PureModal
          buttonLabel={ModalItemProps.buttonLabel}
          className={ModalItemProps.className}
          name={ModalItemProps.name}
          title={ModalItemProps.title}
          content={ModalItemProps.content}
        />,
        container,
      );
    });
  });
});
