/* eslint-disable prettier/prettier */
import { Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    UpdateDateColumn, 
    ManyToMany, 
    JoinTable, } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';

@Entity('project')
export class Project extends User {
    @Column({ nullable: true })
    url: string;
  
    @Column({ nullable: true })
    name: string;
project
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