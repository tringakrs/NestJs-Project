/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { Tasks } from './entities/tasks.entity';
import { TasksRepository } from './repository/tasks.repository';
import { UpdateTasksDto } from './dtos/update-tasks.dto';

/* eslint-disable prettier/prettier */
@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async getTasks(): Promise<Tasks[]> {
    return await this.tasksRepository.getTasks();
  }
  async createTasks(createTasksDto: CreateTasksDto): Promise<Tasks> {
    return await this.tasksRepository.createTasks(createTasksDto);
  }
  async getTasksById(tasksId: string): Promise<Tasks> {
    return await this.tasksRepository.getTasksById(tasksId);
  }

    async updateTasks(tasksId: string, updateTasksDto : UpdateTasksDto) : Promise<Tasks>{
      return await this.tasksRepository.updateTasks(tasksId,updateTasksDto)
    }

  async removeTasks(tasksId: string): Promise<void> {
    return await this.tasksRepository.removeTasks(tasksId);
  }

  async addUserToTasks(tasksId:string, userId: string) :Promise<void>{
    return await this.tasksRepository.addUserToTasks(tasksId,userId)
  }
}
