import { fireEvent, render } from '@testing-library/react';
import CompanyFilter from './index';

const companyFilterProps = {
  selectCompany: () => {
    console.log('dummy');
  },
};
describe('Product Page', () => {
  it('renders Product page', () => {
    render(<CompanyFilter selectCompanyFunc={companyFilterProps.selectCompany} />);
  });
  it('change user company name input', () => {
    const { getByAltText } = render(<CompanyFilter selectCompanyFunc={companyFilterProps.selectCompany} />);
    const input = getByAltText('company-name-input') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '이름이름',
      },
    });
    expect(input.value).toBe('이름이름');
  });
});
