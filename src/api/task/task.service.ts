/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.taskRepository.getTasks();
  }

  async getTaskById(taskId: string): Promise<Task> {
    return await this.taskRepository.getTasksById(taskId);
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(data);
  }

  async updateTask(taskId: string, data: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.updateTask(taskId, data);
  }

  async removeTask(taskId: string): Promise<void> {
    await this.taskRepository.removeTask(taskId);
  }

//   async addTaskToUser(data: {taskId :string, userId: string}) : Promise<Task>{
//     const { taskId , userId } = data;
//     const user = await this.userService.findOne(userId);

//         if(!user) {
//             throw new NotFoundException('User not found');
//         }

//     const task = await this.taskRepository.findOne({
//         where:{
//             uuid: taskId,
//         },
//         relations:['user']
//     })
//        if (!task) {
//            throw new NotFoundException('Task not found');
//        }
//     task.users=user;
//     await this.taskRepository.save(task)

//     return task;
//  }


// async addTaskToProject(data: {taskId:string, projectId: string}) :Promise<Task>{
//     const {taskId, projectId} = data;
//     const project= await this.projectService.getProjectById(projectId);

//         if(!project) {
//             throw new NotFoundException('Project not found');
//         }
//     const task= await this.taskRepository.findOne({
//         where:{
//             uuid:taskId
//         },
//         relations:['project']
//     })
//        if (!task) {
//            throw new NotFoundException('Task not found');
//        } 
//     task.projects = project;
//     await this.taskRepository.save(task);
//     return task;
// }

async addUserToTasks(taskId: string, userId: string): Promise<void> {
  return await this.taskRepository.addUserToTask(taskId, userId);
}

async addProjectToTasks(taskId: string, projectId: string): Promise<void> {
  return await this.taskRepository.addProjectToTask(taskId, projectId);
}

}
