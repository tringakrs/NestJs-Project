import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { UserGender } from '../enums/userGender.enum';
import { UserRoles } from '../enums/roles.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { UserStatus } from '../enums/userStatus.enum';
import { Task } from 'src/api/task/entities/task.entity';
import { OneToMany } from 'typeorm';
import { Report } from 'src/api/reports/entities/report.entity';

@Entity('users')
export class User extends AuditEntity {
  @Column({
    type: 'enum',
    default: UserRoles.USER,
    enum: UserRoles,
  })
  role: UserRoles;
  @Column({ default: false })
  isRoleOverridden: boolean;

  @Column({ type: 'integer', default: 1 })
  permissions: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRt: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  birthDate: Date;
  @Column({ nullable: true })
  isVerified: boolean;

  @OneToMany(() => Task, (task) => task.users)
  task: Task;

  @OneToMany(() => Report, (report) => report.users)
  reports: Report[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ type: 'enum', default: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @Column({ nullable: true })
  avatar: string;
}
