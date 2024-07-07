import { Test, TestingModule } from '@nestjs/testing';
import { UserRecordsController } from '../user-records.controller';
import { UserRecordsService } from '../user-records.service';

describe('UserRecordsController', () => {
  let controller: UserRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRecordsController],
      providers: [UserRecordsService],
    }).compile();

    controller = module.get<UserRecordsController>(UserRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
