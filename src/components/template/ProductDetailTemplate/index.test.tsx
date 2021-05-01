import { render, fireEvent, waitForElement } from '@testing-library/react';
import ProductDetailTemplate from './index';

describe('Product Page', () => {
  it('renders Product page', () => {
    render(<ProductDetailTemplate />);
  });

  it('change product name input', () => {
    const { getByLabelText } = render(<ProductDetailTemplate />);
    const input = getByLabelText('상품명') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '상품 이름 입력 테스트',
      },
    });
    expect(input.value).toBe('상품 이름 입력 테스트');
  });

  it('change product price input', () => {
    const { getByLabelText } = render(<ProductDetailTemplate />);
    const input = getByLabelText('상품 가격') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 30000,
      },
    });
    expect(input.value).toBe('30000');
  });

  it('change product price input for unexpected type', () => {
    const { getByLabelText } = render(<ProductDetailTemplate />);
    const input = getByLabelText('상품 가격') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'string',
      },
    });
    expect(input.value).toBe('');
  });

  it('change product description input', () => {
    const { getByLabelText } = render(<ProductDetailTemplate />);
    const input = getByLabelText('상품 상세 설명') as HTMLTextAreaElement;
    fireEvent.change(input, {
      target: {
        value: '상품 상세 설명 입력 테스트',
      },
    });
    expect(input.value).toBe('상품 상세 설명 입력 테스트');
  });

  it('test length limitation of product description input', () => {
    const { getByLabelText } = render(<ProductDetailTemplate />);
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
    const { getByLabelText } = render(<ProductDetailTemplate />);
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

  it('test 3d model product input', async () => {
    const { getByLabelText, getByText, getByAltText } = render(<ProductDetailTemplate />);
    const file = new File(['testing(⌐□_□)'], 'test.obj');
    const imageInput = getByLabelText('상품 3D 모델') as HTMLInputElement;
    fireEvent.change(imageInput, { target: { files: [file] } });

    await waitForElement(() => getByAltText('image-preview'));
    const data = getByAltText('image-preview') as HTMLInputElement;
    const dataURL = data.src;
    expect(dataURL).toMatchSnapshot(
      'data url in the image-preview src for this string: "testing(⌐□_□)"',
    );

    // ensure the form is submittable
    const imageSubmit = getByText('상품 3D 모델') as HTMLInputElement;
    expect(imageSubmit.type).toBe('submit');
  });
});
