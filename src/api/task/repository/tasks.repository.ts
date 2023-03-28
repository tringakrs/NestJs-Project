import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from 'src/common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from 'src/common/db/decorators/CustomRepository.decorator';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../interfaces/task.interface';
import { Project } from 'src/api/project/entities/project.entity';
import { User } from 'src/api/user/entities/user.entity';

@CustomRepository(Task)
export class TaskRepository
  extends BaseCustomRepository<Task>
  implements ITaskRepository
{
  async getTasks(): Promise<Task[]> {
    return await this.find();
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const task = this.create(data);
    await this.save(task);
    return task;
  }

  async getTasksById(taskId: string): Promise<Task> {
    const task = await this.findOneBy({ uuid: taskId });
    return task;
  }

  async updateTask(taskId: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.getTasksById(taskId);
    if (!task) {
      throw new UnprocessableEntityException('Task doesnt exist');
    }
    await this.update({ uuid: taskId }, data);

    const updated = this.getTasksById(taskId);

    return updated;
  }

  async removeTask(taskId: string): Promise<void> {
    const task = await this.findOneBy({ uuid: taskId });
    await this.delete(task.id);
  }
  async addUserToTask(tasksId: string, userId: string): Promise<void> {
    const tasks = await this.getTasksById(tasksId);
    const user = await this.manager.findOne(User, { where: { uuid: userId } });

    tasks.users = [user];
    await this.save(tasks);
  }

  async addProjectToTask(tasksId: string, projectId: string): Promise<void> {
    const tasks = await this.getTasksById(tasksId);
    const project = await this.manager.findOne(Project, {
      where: { uuid: projectId },
    });

    tasks.projects = [project];
    await this.save(tasks);
  }
}
