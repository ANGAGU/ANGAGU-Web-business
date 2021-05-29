export const isEmail = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
};
export const isPassword = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return regExp.test(value);
};
export const isSame = (str1: string, str2: string): boolean => {
  return str1 === str2;
};

export const string2Date = (value: string) => {
  const year = parseInt(value.substr(0, 4), 10);
  const month = parseInt(value.substr(5, 2), 10);
  return new Date(year, month - 1);
};

export const date2String = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  let result = '';
  if (month < 10) result = `${year}-0${month}`;
  else result = `${year}-${month}`;

  return result;
};
