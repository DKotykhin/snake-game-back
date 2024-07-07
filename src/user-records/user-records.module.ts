import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRecordsService } from './user-records.service';
import { UserRecordsController } from './user-records.controller';
import { UserRecord } from './entities/user-records.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  controllers: [UserRecordsController],
  providers: [UserRecordsService],
})
export class UserRecordsModule {}
