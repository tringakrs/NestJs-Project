/* eslint-disable prettier/prettier */
import { Column,  
    Entity, 
    ManyToOne, } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Status } from '../enums/status.enum';
import { Project } from '../../project/entities/project.entity';

@Entity('tasks')
export class Task extends AuditEntity {
 
    @Column({
      type: 'enum',
      nullable: false,
      default: Type.Task1,
      enum: Type,
    })
    type: Type;

    @Column({ nullable: true })
    name: string;
    
    @Column({ nullable: true })
    description: string;

    @Column({
      type: 'enum',
      nullable: false,
      default: Status.Started,
      enum: Status,
    })
    status: Status;

    @Column({ nullable: true })
    deadline: Date;

    @ManyToOne(() => User, (users) => users.tasks)
    user: User[]
    
    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project[]
}