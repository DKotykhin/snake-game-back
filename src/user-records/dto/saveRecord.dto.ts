import { IsNumber } from 'class-validator';

export class SaveRecordDto {
  @IsNumber()
  score: number;

  @IsNumber()
  level: number;
}
