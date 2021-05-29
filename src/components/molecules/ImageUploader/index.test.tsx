import { render } from '@testing-library/react';
import ImageUploader from './index';

describe('ImageUploader', () => {
  it('renders ImageUploader', () => {
    render(<ImageUploader label="test" />);
  });
});
