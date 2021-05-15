import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductPageTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(
      <Router>
        <ProductPageTemplate />
      </Router>,
    );
  });
});
