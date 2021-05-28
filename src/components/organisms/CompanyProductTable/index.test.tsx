import { render, screen } from '@testing-library/react';
import CompanyProductTable from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<CompanyProductTable />);
  });
});
