import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRecord } from './entities/user-records.entity';

@Injectable()
export class UserRecordsService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRecordsRepository: Repository<UserRecord>,
  ) {}

  async create(userRecord: UserRecord): Promise<UserRecord> {
    return this.userRecordsRepository.save(userRecord);
  }

  async findByUserId(userId: string): Promise<UserRecord[]> {
    return this.userRecordsRepository.find({
      where: { user: { id: userId } },
      order: { level: 'ASC' },
    });
  }
}
