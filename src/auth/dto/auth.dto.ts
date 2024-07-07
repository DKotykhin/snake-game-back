import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class PasswordDto {
  @IsString()
  @Length(8, 100, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter and one number',
  })
  password?: string;
}
export class EmailDto {
  @IsEmail()
  email: string;
}
export class SignInDto extends PasswordDto {
  @IsEmail()
  email: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  @Length(2, 30, { message: 'Name must be at least 2 characters' })
  userName: string;
}

export class UserWithTokenDto {
  user: Partial<User>;
  auth_token: string;
}
