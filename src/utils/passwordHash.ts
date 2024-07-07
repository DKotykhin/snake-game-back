import * as bcrypt from 'bcryptjs';

import { HttpStatus, HttpException } from '@nestjs/common';

export class PasswordHash {
  private static index = 5;

  static create = async (password: string) => {
    const salt = await bcrypt.genSalt(this.index);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  };

  static compare = async (
    password: string,
    passwordHash: string,
    message: string,
  ) => {
    const isValidPass = await bcrypt.compare(password, passwordHash);
    if (!isValidPass) {
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
    return isValidPass;
  };

  static same = async (
    password: string,
    passwordHash: string,
    message: string,
  ) => {
    const isValidPass = await bcrypt.compare(password, passwordHash);
    if (isValidPass) {
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    return isValidPass;
  };
}
