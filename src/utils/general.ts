import crypto from 'crypto';

export function generateRandomCode(length: number) {
    return crypto
      .randomBytes(length * 3)
      .toString('base64')
      .split('+')
      .join('')
      .split('/')
      .join('')
      .split('=')
      .join('')
      .substr(0, length);
  }