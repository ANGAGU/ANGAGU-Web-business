import { fireEvent, render } from '@testing-library/react';
import DateSelector from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<DateSelector />);
  });
  it('change user company name input', () => {
    const { getByLabelText } = render(<DateSelector />);
  });
});
