/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { TaskRepository } from './repository/tasks.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([TaskRepository]),
    UserModule,
    ProjectModule
  ],  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
