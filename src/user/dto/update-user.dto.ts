import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  address?: string;

  @IsOptional()
  @IsString()
  @Length(7, 12, { message: 'Phone must be between 7 and 12 characters' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  passwordHash?: string;
}
