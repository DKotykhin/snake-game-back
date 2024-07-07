import { Controller } from '@nestjs/common';
import { UserRecordsService } from './user-records.service';

@Controller('user-records')
export class UserRecordsController {
  constructor(private readonly userRecordsService: UserRecordsService) {}
}
