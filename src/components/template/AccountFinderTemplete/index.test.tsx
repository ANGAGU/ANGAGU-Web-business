import { fireEvent, render } from '@testing-library/react';

import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import AccountFinderTemplate from './index';

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

describe('AccountFinderTemplate Component', () => {
  it('renders component', () => {
    act(() => {
      render(<AccountFinderTemplate />);
    });
  });

  it('change product name input', () => {
    const { getByLabelText } = render(<AccountFinderTemplate />);
    const input = getByLabelText('이름') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '이름',
      },
    });
    expect(input.value).toBe('이름');
  });

  it('change id input', () => {
    const { getByLabelText } = render(<AccountFinderTemplate />);
    const input = getByLabelText('아이디') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'string',
      },
    });
    expect(input.value).toBe('string');
  });

  it('change phone number input', () => {
    const { getByLabelText } = render(<AccountFinderTemplate />);
    const input = getByLabelText('핸드폰') as HTMLTextAreaElement;
    fireEvent.change(input, {
      target: {
        value: '01000000000',
      },
    });
    expect(input.value).toBe('01000000000');
  });
});
