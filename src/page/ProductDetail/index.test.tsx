import { render, screen } from '@testing-library/react';
import ProductDetail from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<ProductDetail />);
  });
});
