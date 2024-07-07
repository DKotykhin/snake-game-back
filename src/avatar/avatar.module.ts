import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Module({
  controllers: [],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
