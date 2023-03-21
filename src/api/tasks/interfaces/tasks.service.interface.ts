// remove eslint comment when you start to populate the interface

import { CreateTasksDto } from '../dtos/create-tasks.dto';
import { UpdateTasksDto } from '../dtos/update-tasks.dto';
import { Tasks } from '../entities/tasks.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITasksService {
  create(createTasksDto: CreateTasksDto): Promise<Tasks>;

  findOne(tasksId: string): Promise<Tasks>;

  findAll(): Promise<Tasks[]>;

  update(tasksId: string, updateTasksDto: UpdateTasksDto): Promise<Tasks>;

  remove(tasksId: string): Promise<void>;
}
