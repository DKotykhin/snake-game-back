import { Test, TestingModule } from '@nestjs/testing';
import { UserRecordsService } from '../user-records.service';

describe('UserRecordsService', () => {
  let service: UserRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRecordsService,
        {
          provide: 'UserRecordRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserRecordsService>(UserRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
