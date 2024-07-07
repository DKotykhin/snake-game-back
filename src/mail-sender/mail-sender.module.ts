import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';

@Module({
  controllers: [],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
