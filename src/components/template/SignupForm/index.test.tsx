import { fireEvent, render } from '@testing-library/react';
import Signup from './index';

describe('Signup Page', () => {
  it('renders signup page', () => {
    render(<Signup />);
  });
  it('change user name input', () => {
    const { getByLabelText } = render(<Signup />);
    const input = getByLabelText('이름') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '이름 입력 테스트',
      },
    });
    expect(input.value).toBe('이름 입력 테스트');
  });

  it('validate name checking function', () => {
    const el = render(<Signup />);
    expect(el.checkNameValue('박 영')).toBe(false);
  });

  it('change user email input', () => {
    const { getByLabelText } = render(<Signup />);
    const input = getByLabelText('이메일') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'test@gmail.com',
      },
    });
    expect(input.value).toBe('test@gmail.com');
  });

  it('validate email checking function', () => {
    const el = render(<Signup />);
    expect(el.checkEmailValue('test.test.com')).toBe(false);
  });

  it('change password input', () => {
    const { getByLabelText } = render(<Signup />);
    const input = getByLabelText('비밀번호') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'password1!',
      },
    });
    expect(input.value).toBe('password1!');
  });

  it('change checking password input', () => {
    const { getByLabelText } = render(<Signup />);
    const input = getByLabelText('비밀번호 확인') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'password1!',
      },
    });
    expect(input.value).toBe('password1!');
  });

  it('validate password checking function', () => {
    const el = render(<Signup />);
    expect(el.checkPasswordValue('password1!', 'password!')).toBe(false);
  });

  it('change user birthday input', () => {
    const { getByLabelText } = render(<Signup />);
    const input = getByLabelText('생년월일') as HTMLTextAreaElement;
    fireEvent.change(input, {
      target: {
        value: '1998-04-19',
      },
    });
    expect(input.value).toBe('1998-04-19');
  });
});
