import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MailSenderService } from '../../mail-sender/mail-sender.service';
import { UserService } from '../../user/user.service';
import { AvatarService } from '../../avatar/avatar.service';
import { AuthService } from '../auth.service';
import { EmailConfirm } from '../entities/email-confirm.entity';
import { ResetPassword } from '../entities/reset-password.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(EmailConfirm),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ResetPassword),
          useValue: {},
        },
        {
          provide: MailSenderService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: AvatarService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
