import { render } from '@testing-library/react';
import CompanyProductTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<CompanyProductTemplate />);
  });
});
