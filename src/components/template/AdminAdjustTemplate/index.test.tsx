import { render } from '@testing-library/react';
import AdminAdjustTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<AdminAdjustTemplate isAdmin={false} />);
    render(<AdminAdjustTemplate isAdmin />);
  });
  it('check table header to make sure page is well rendered as admin', () => {
    const { getByText } = render(<AdminAdjustTemplate isAdmin />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
  it('check table header to make sure page is well rendered as business', () => {
    const { getByText } = render(<AdminAdjustTemplate isAdmin={false} />);
    // 승인하기 테이블 존재여부 check
    const tableHeader = getByText('Scanit') as HTMLInputElement;
    expect(tableHeader).toBeInTheDocument();
  });
});
