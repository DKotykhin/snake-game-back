import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRecord } from './entities/user-records.entity';
import { SaveRecordDto } from './dto/saveRecord.dto';

@Injectable()
export class UserRecordsService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRecordsRepository: Repository<UserRecord>,
  ) {}

  async save(userRecord: SaveRecordDto, id: string): Promise<UserRecord> {
    const userRecords = await this.findByUserId(id);
    const record = userRecords.filter(
      (record) => record.level === userRecord.level,
    );
    if (record.length > 0) {
      return this.userRecordsRepository.save({
        ...record[0],
        score: userRecord.score,
      });
    } else {
      return this.userRecordsRepository.save({
        user: { id },
        ...userRecord,
      });
    }
  }

  async findByUserId(userId: string): Promise<UserRecord[]> {
    return this.userRecordsRepository.find({
      where: { user: { id: userId } },
      order: { level: 'ASC' },
    });
  }
}
