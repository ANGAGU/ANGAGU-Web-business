import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AdminUserTable from './index';

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

describe('CompanyOrderTable Component', () => {
  it('renders component', () => {
    act(() => {
      render(<AdminUserTable />, container);
    });
  });
});
