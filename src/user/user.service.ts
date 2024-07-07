import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { AvatarService } from '../avatar/avatar.service';
import { StatusResponseDto } from '../auth/dto/status-response.dto';
import { PasswordHash } from '../utils/passwordHash';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly avatarService: AvatarService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // const user = new User(createUserDto);
      // return await this.entityManager.save(User, user);
      return await this.entityManager.save(User, createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.entityManager.save(User, {
        id,
        ...updateUserDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<StatusResponseDto> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: `User id ${id} successfully deleted`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async confirmPassword(
    id: string,
    password: string,
  ): Promise<StatusResponseDto> {
    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await PasswordHash.compare(
      password,
      user.passwordHash,
      'Password not match',
    );
    return {
      status: true,
      message: 'Password confirmed',
    };
  }

  async changePassword(
    id: string,
    newPassword: string,
  ): Promise<StatusResponseDto> {
    if (!newPassword) {
      throw new HttpException(
        'New password is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await PasswordHash.same(
      newPassword,
      user.passwordHash,
      'The same password!',
    );
    const passwordHash = await PasswordHash.create(newPassword);
    user.passwordHash = passwordHash;
    await this.entityManager.save(User, user);
    return {
      status: true,
      message: 'Password successfully changed',
    };
  }

  async uploadAvatar(
    id: string,
    avatar: Express.Multer.File,
  ): Promise<StatusResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      const fileName = await this.avatarService.createAvatar(id, avatar);
      user.avatarUrl = fileName;
      await this.entityManager.save(User, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      status: true,
      message: 'Avatar successfully uploaded',
    };
  }

  async deleteAvatar(id: string): Promise<StatusResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.avatarService.deleteAvatar(user.avatarUrl);
      user.avatarUrl = null;
      await this.entityManager.save(User, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {
      status: true,
      message: 'Avatar successfully deleted',
    };
  }
}
