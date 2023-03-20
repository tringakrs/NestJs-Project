/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { TasksRepository } from './repository/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([TasksRepository])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
