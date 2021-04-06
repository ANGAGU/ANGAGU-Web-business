import { render, screen } from '@testing-library/react';
import Product from './index';

describe('Product Page', () => {
    it('renders Product page', () => {
        render(<Product />);
    })
});
