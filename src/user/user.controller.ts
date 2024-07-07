import {
  Controller,
  Body,
  Patch,
  Delete,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { StatusResponseDto } from '../auth/dto/status-response.dto';
import { PasswordDto } from '../auth/dto/auth.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  remove(@GetUser() user: User): Promise<StatusResponseDto> {
    return this.userService.remove(user.id);
  }

  @Post('password')
  confirmPassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponseDto> {
    return this.userService.confirmPassword(user.id, passwordDto.password);
  }

  @Patch('password')
  changePassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponseDto> {
    return this.userService.changePassword(user.id, passwordDto.password);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<StatusResponseDto> {
    return this.userService.uploadAvatar(user.id, avatar);
  }

  @Delete('avatar')
  removeAvatar(@GetUser() user: User): Promise<StatusResponseDto> {
    return this.userService.deleteAvatar(user.id);
  }
}
