import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/base.entity';
import { EmailConfirm } from '../../auth/entities/email-confirm.entity';
import { ResetPassword } from '../../auth/entities/reset-password.entity';
import { UserRecord } from '../../user-records/entities/user-records.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  @Exclude()
  passwordHash: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToOne(() => EmailConfirm, (emailConfirm) => emailConfirm.user, {
    cascade: true,
  })
  emailConfirm: EmailConfirm;

  @OneToOne(() => ResetPassword, (resetPassword) => resetPassword.user, {
    cascade: true,
  })
  resetPassword: ResetPassword;

  @OneToMany(() => UserRecord, (userRecord) => userRecord.user)
  userRecords: UserRecord[];
}
