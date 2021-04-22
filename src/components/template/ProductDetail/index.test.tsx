import { render, fireEvent } from '@testing-library/react';
import ProductDetail from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<ProductDetail />);
  });

  it('change product name input', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const input = getByLabelText('상품명') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '상품 이름 입력 테스트',
      },
    });
    expect(input.value).toBe('상품 이름 입력 테스트');
  });

  it('change product price input', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const input = getByLabelText('상품 가격') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 30000,
      },
    });
    expect(input.value).toBe('30000');
  });

  it('change product price input for unexpected type', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const input = getByLabelText('상품 가격') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'string',
      },
    });
    expect(input.value).toBe('');
  });

  it('change product description input', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const input = getByLabelText('상품 상세 설명') as HTMLTextAreaElement;
    fireEvent.change(input, {
      target: {
        value: '상품 상세 설명 입력 테스트',
      },
    });
    expect(input.value).toBe('상품 상세 설명 입력 테스트');
  });

  it('test length limitation of product description input', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const input = getByLabelText('상품 상세 설명') as HTMLTextAreaElement;
    const testText =
      '상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트상품 상세 설명 입력 테스트';
    console.log(testText.length);

    fireEvent.change(input, {
      target: {
        value: testText,
      },
    });
    expect(input.value.length).toBeLessThan(501);
  });

  it('change multiple input', () => {
    const { getByLabelText } = render(<ProductDetail />);
    const nameInput = getByLabelText('상품명') as HTMLInputElement;
    const priceInput = getByLabelText('상품 가격') as HTMLInputElement;
    const descInput = getByLabelText('상품 상세 설명') as HTMLTextAreaElement;
    fireEvent.change(nameInput, {
      target: {
        value: '상품 이름 입력 테스트',
      },
    });
    fireEvent.change(priceInput, {
      target: {
        value: 30000,
      },
    });
    fireEvent.change(descInput, {
      target: {
        value: '상품 상세 설명 입력 테스트',
      },
    });
    const testValue = {
      name: nameInput.value,
      price: priceInput.value,
      desc: descInput.value,
    };
    console.log(testValue);
    expect(testValue).toMatchObject({
      name: '상품 이름 입력 테스트',
      price: '30000',
      desc: '상품 상세 설명 입력 테스트',
    });
  });
});
