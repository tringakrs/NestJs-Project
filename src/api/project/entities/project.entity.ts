/* eslint-disable prettier/prettier */
import { Column, 
    Entity,     
    ManyToMany, 
    JoinTable,
  } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Task } from 'src/api/task/entities/task.entity';
import { OneToMany } from 'typeorm';
import { Report } from 'src/api/report/entities/report.entity';

@Entity('project')
export class Project extends AuditEntity {
    @Column({ nullable: true })
    url: string;
  
    @Column({ nullable: true })
    name: string;

    @Column({
        type: 'enum',
        nullable: false,
        default: Type.Bookshop,
        enum: Type,
      })
      type: Type;

      @ManyToMany(() => User)
      @JoinTable()
      users: User[]

      @OneToMany(() => Task, (task) => task.projects)
      task: Task;

      @OneToMany(() => Report, (report) => report.projects)
      reports: Report[];
}