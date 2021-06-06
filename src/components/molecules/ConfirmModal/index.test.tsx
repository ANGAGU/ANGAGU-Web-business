import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ConfirmModal from './index';

let container: HTMLElement;

const ModalItemProps = {
  viewModal: false,
  phoneNumber: 'test',
  setAuthToken: () => {
    console.log('dummy');
  },
  toggleModal: () => {
    console.log('dummy');
  },
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
        <ConfirmModal
          viewModal={ModalItemProps.viewModal}
          phoneNumber={ModalItemProps.phoneNumber}
          setAuthToken={ModalItemProps.setAuthToken}
          toggleModal={ModalItemProps.toggleModal}
        />,
        container,
      );
    });
  });
});
