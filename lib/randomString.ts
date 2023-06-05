import { randomBytes } from 'crypto';

export const randomString = (length: number = 32): string => {
  return randomBytes(length).toString('base64');
};
