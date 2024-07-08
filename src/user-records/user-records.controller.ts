import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRecordsService } from './user-records.service';
import { UserRecord } from './entities/user-records.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { SaveRecordDto } from './dto/saveRecord.dto';

@Controller('user-records')
@UseGuards(AuthGuard('jwt'))
export class UserRecordsController {
  constructor(private readonly userRecordsService: UserRecordsService) {}

  @Get()
  async findByUserId(@GetUser() user: User): Promise<UserRecord[]> {
    return this.userRecordsService.findByUserId(user.id);
  }

  @Post('create')
  async save(
    @Body() userRecord: SaveRecordDto,
    @GetUser() user: User,
  ): Promise<UserRecord> {
    return this.userRecordsService.save(userRecord, user.id);
  }
}
