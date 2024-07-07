import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './utils/env.validator';
import { UserRecordsModule } from './user-records/user-records.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    AvatarModule,
    AuthModule,
    DatabaseModule,
    UserModule,
    UserRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
