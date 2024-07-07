import { Column, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserRecord extends BaseEntity {
  @Column({ default: 0 })
  score: number;

  @Column()
  level: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userRecords, { onDelete: 'CASCADE' })
  user: User;
}
