import { PASSWORD_LENGTH } from '../config/constants.ts';

export const emailValidator = (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

export const checkPassword = (password: string) => !password.length || password.length >= PASSWORD_LENGTH;

export const convertTime = (time: Date, format: string) => {
  switch (format) {
    case 'GTM+0':
      return time;
    case 'GTM+1':
      return time;
    case 'GTM+2':
      return time;
    case 'GTM+3':
      return time;
    default:
      return time;
  }
};

export const convertDate = (time: Date, format: string) => {
  switch (format) {
    case 'YYYY-MM-DD':
      return new Date(time);
    default:
      return new Date(time);
  }
};

export const convertRoles = (roles: Array<{role_id: number, role_name: string}>) => {
  const result: {[key: number]: string} = {}
  roles.forEach(r => result[r.role_id] = r.role_name)
  return result;
}

export const getKeyByRoleValue = (object: {[key: string]: string}, value: string) => {
  const result =  Object.keys(object).find((key: string) => object[key] === value);
  return result as string
}
