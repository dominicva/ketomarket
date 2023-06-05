import { randomBytes } from 'crypto';

export const randomString = (length: number = 32): string => {
  return randomBytes(length).toString('base64');
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
