import { act, fireEvent, render } from '@testing-library/react';
import Signup from './index';
import { isEmail, isPassword, isSame } from '../../../utils';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Signup Page', () => {
  it('renders signup page', () => {
    render(
      <Router>
        <Signup />
      </Router>,
    );
  });
  it('change user company name input', () => {
    const { getByLabelText } = render(
      <Router>
        <Signup />
      </Router>,
    );
    const input = getByLabelText('회사명') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: '이름이름',
      },
    });
    expect(input.value).toBe('이름이름');
  });
  it('change user email input', () => {
    const { getByLabelText } = render(
      <Router>
        <Signup />
      </Router>,
    );
    const input = getByLabelText('이메일') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'test@gmail.com',
      },
    });
    expect(input.value).toBe('test@gmail.com');
  });

  it('validate email checking function', () => {
    expect(isEmail('test.test.com')).toBe(false);
  });

  it('validate email checking function', () => {
    expect(isEmail('test@test.com')).toBe(true);
  });

  it('change password input', () => {
    const { getByLabelText } = render(
      <Router>
        <Signup />
      </Router>,
    );
    const input = getByLabelText('비밀번호') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'password1!',
      },
    });
    expect(input.value).toBe('password1!');
  });

  it('change checking password input', () => {
    const { getByLabelText } = render(
      <Router>
        <Signup />
      </Router>,
    );
    const input = getByLabelText('비밀번호 확인') as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: 'password1!',
      },
    });
    expect(input.value).toBe('password1!');
  });

  it('validate password checking function', () => {
    expect(isPassword('password')).toBe(false);
  });

  it('validate password checking function', () => {
    expect(isPassword('password1')).toBe(true);
  });

  it('check both passwords are same', () => {
    expect(isSame('password1!', 'password!')).toBe(false);
  });

  it('check both passwords are same', () => {
    expect(isSame('password1', 'password1')).toBe(true);
  });

  it('change user phone number input', () => {
    const { getByLabelText } = render(
      <Router>
        <Signup />
      </Router>,
    );
    const input = getByLabelText('휴대폰') as HTMLTextAreaElement;
    fireEvent.change(input, {
      target: {
        value: '010-0000-0000',
      },
    });
    expect(input.value).toBe('010-0000-0000');
  });
});
