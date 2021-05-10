import { fireEvent, render } from '@testing-library/react';
import AdjustPage from './index';

describe('Adjust Page', () => {
  it('renders Adjust page', () => {
    render(<AdjustPage isAdmin={false} />);
    render(<AdjustPage isAdmin />);
  });
  it('check table header to make sure page is well rendered as admin', () => {
    const { getByText } = render(<AdjustPage isAdmin />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
  it('check table header to make sure page is well rendered as business', () => {
    const { getByText } = render(<AdjustPage isAdmin={false} />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
});
