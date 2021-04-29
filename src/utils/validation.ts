export const isEmail = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
};
export const isPassword = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;
  return regExp.test(value);
};
export const isSame = (str1: string, str2: string): boolean => {
  return str1 === str2;
};
