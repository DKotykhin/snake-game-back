import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { EmailDto, PasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import { StatusResponseDto } from './dto/status-response.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  getUserByToken(@GetUser() user: Partial<User>): Promise<Partial<User>> {
    return this.authService.getUserByToken(user);
  }

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<Partial<User>> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<User>> {
    return this.authService.signIn(signInDto, response);
  }

  @Get('/confirm-email/:token')
  confirmEmail(@Param('token') token: string): Promise<StatusResponseDto> {
    return this.authService.confirmEmail(token);
  }

  @Post('/reset-password')
  resetPassword(@Body() emailDto: EmailDto): Promise<StatusResponseDto> {
    return this.authService.resetPassword(emailDto);
  }

  @Post('/new-password/:token')
  setNewPassword(
    @Param('token') token: string,
    @Body() newPassword: PasswordDto,
  ): Promise<StatusResponseDto> {
    return this.authService.setNewPassword(token, newPassword.password);
  }
}
