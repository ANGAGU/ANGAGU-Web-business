import { render } from '@testing-library/react';
import CompanyAdjustTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<CompanyAdjustTemplate isAdmin={false} />);
    render(<CompanyAdjustTemplate isAdmin />);
  });
  it('check table header to make sure page is well rendered as admin', () => {
    const { getByText } = render(<CompanyAdjustTemplate isAdmin />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('승인하기') as HTMLInputElement;
    expect(tableHeader).toBe(true);
  });
  it('check table header to make sure page is well rendered as business', () => {
    const { getByText } = render(<CompanyAdjustTemplate isAdmin={false} />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('승인하기') as HTMLInputElement;
    expect(tableHeader).not.toBe(true);
  });
});
