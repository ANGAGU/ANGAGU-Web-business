import { fireEvent, render } from '@testing-library/react';
import MonthSelector from './index';

const MonthSelectorProps = {
  title: '',
  selectDate: () => {
    console.log('dummy');
  },
};
describe('Month selector', () => {
  it('renders Product page', () => {
    render(
      <MonthSelector
        title="test"
        selectDateFunc={MonthSelectorProps.selectDate}
      />,
    );
  });
  it('change user company name input', () => {
    const { getByLabelText } = render(
      <MonthSelector
        title="test"
        selectDateFunc={MonthSelectorProps.selectDate}
      />,
    );
  });
});
