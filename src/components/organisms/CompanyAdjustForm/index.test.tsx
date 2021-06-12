import { render } from '@testing-library/react';
import CompanyAdjustForm from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<CompanyAdjustForm />);
    render(<CompanyAdjustForm />);
  });
  it('check table header to make sure page is well rendered as admin', () => {
    const { getByText } = render(<CompanyAdjustForm />);

    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
  it('check table header to make sure page is well rendered as business', () => {
    const { getByText } = render(<CompanyAdjustForm />);

    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
});
