import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName: string;

  @IsString()
  passwordHash?: string;
}
