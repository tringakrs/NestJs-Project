import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { Tasks } from '../entities/tasks.entity';
import { ITasksRepository } from '../interfaces/tasks.repository.interface';
import { CreateTasksDto } from '../dtos/create-tasks.dto';
import { UpdateTasksDto } from '../dtos/update-tasks.dto';
import { User } from 'src/api/user/entities/user.entity';
import { Project } from 'src/api/project/entities/project.entity';

@CustomRepository(Tasks)
export class TasksRepository
  extends BaseCustomRepository<Tasks>
  implements ITasksRepository
{
  async getTasks(): Promise<Tasks[]> {
    return await this.find();
  }

  async createTasks(createTasksDto: CreateTasksDto): Promise<Tasks> {
    const tasks = this.create(createTasksDto);
    await this.save(tasks);
    return tasks;
  }

  async getTasksById(tasksId: string): Promise<Tasks> {
    const tasks = await this.findOneBy({ uuid: tasksId });
    if (!tasks) {
      throw new UnprocessableEntityException('This project does not exist!');
    }
    return tasks;
  }

  async updateTasks(
    tasksId: string,
    updateTasksDto: UpdateTasksDto,
  ): Promise<Tasks> {
    const tasks = await this.getTasksById(tasksId);
    if (!tasks) {
      throw new UnprocessableEntityException(
        `Tasks with ID ${tasksId} not found`,
      );
    }
    Object.assign(tasks, updateTasksDto);
    await this.save(tasks);
    return tasks;
  }

  async removeTasks(tasksId: string): Promise<void> {
    const tasks = await this.findOneBy({ uuid: tasksId });
    await this.delete(tasks.id);
  }

  async addUserToTasks(tasksId: string, userId: string): Promise<void> {
    const tasks = await this.getTasksById(tasksId);
    const user = await this.manager.findOne(User, { where: { uuid: userId } });

    tasks.users = [user];
    await this.save(tasks);
  }

  async addProjectToTasks(tasksId: string, projectId: string): Promise<void> {
    const tasks = await this.getTasksById(tasksId);
    const project = await this.manager.findOne(Project, {
      where: { uuid: projectId },
    });

    tasks.projects = [project];
    await this.save(tasks);
  }
}
