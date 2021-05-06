import { fireEvent, render } from '@testing-library/react';
import DateSelector from './index';

const dateSelectorProps = {
  selectDate: () => {
    console.log('dummy');
  },
};
describe('Product Page', () => {
  it('renders Product page', () => {
    render(<DateSelector selectDateFunc={dateSelectorProps.selectDate} />);
  });
  it('change user company name input', () => {
    const { getByLabelText } = render(
      <DateSelector selectDateFunc={dateSelectorProps.selectDate} />,
    );
  });
});
