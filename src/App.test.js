import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Page', () => {
    it('renders App page', () => {
        render(<App />);
    })
});
