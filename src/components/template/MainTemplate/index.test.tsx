import { render } from '@testing-library/react';
import MainTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<MainTemplate />);
  });

  it('check table header to make sure page is well rendered as business', () => {
    const { getByText } = render(<MainTemplate />);

    const header = getByText('Scanit') as HTMLInputElement;
    expect(header).toBeInTheDocument();
  });
});
