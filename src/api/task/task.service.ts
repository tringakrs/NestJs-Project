/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/tasks.repository';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService){}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks();
    
    if (!tasks || tasks.length === 0) 
      throw new NotFoundException('No reports found');

  return tasks;
  }

  async getTaskById(taskId: string): Promise<Task> {
    const tasks = await this.taskRepository.getTasksById(taskId);
    
    if (!tasks) {
      throw new NotFoundException('No reports found');
    }
  return tasks;
  }

  async createTask(data:CreateTaskDto):Promise<Task>{
    const taskExists = await this.taskRepository.findOneBy({
        name: data.name,
      });
      if (taskExists) 
        throw new ConflictException(
          `A task with name ${data.name} already exists`,
        );
    return await this.taskRepository.createTask(data);
  }

  async updateTask(taskId: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(taskId);
    const taskExists = await this.taskRepository.findOne({
      where: {
        name: data.name,
      },
    });
  
    if (!task || (taskExists && task.name == taskExists.name)) {
      throw new NotFoundException(
        `A task with name ${data.name} already exists or task not found`,
        );
    }
  
    return await this.taskRepository.updateTask(taskId, data);
  }

  async removeTask(taskId:string):Promise<void>{
    const task = await this.getTaskById(taskId)
    
       if (!task) 
           throw new NotFoundException('Task not found');

    await this.taskRepository.removeTask(taskId)
  }

  async addUserToTasks(taskId: string, userId: string): Promise<void> {
    return await this.taskRepository.addUserToTask(taskId, userId);
  }

  async addProjectToTasks(taskId: string, projectId: string): Promise<void> {
    return await this.taskRepository.addProjectToTask(taskId, projectId);
  }

}
