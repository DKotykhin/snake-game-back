import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class EmailConfirm extends BaseEntity {
  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  expiredAt: Date;

  @Column({ nullable: true })
  verifiedAt: Date;

  @OneToOne(() => User, (user) => user.emailConfirm, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
