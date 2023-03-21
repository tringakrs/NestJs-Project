/* eslint-disable prettier/prettier */
import { Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    UpdateDateColumn, 
    ManyToOne, } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Status } from '../enums/status.enum';
import { Project } from '../../project/entities/project.entity';

@Entity('tasks')
export class Tasks extends AuditEntity {
 
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
    users: User[]
    
    @ManyToOne(() => Project, (projects) => projects.tasks)
    projects: Project[]

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
}