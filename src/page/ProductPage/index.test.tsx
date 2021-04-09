import { render, screen } from '@testing-library/react';
import ProductPage from './index';

describe('Product Page', () => {
    it('renders Product page', () => {
        render(<ProductPage />);
    });
});
