// remove eslint comment when you start to populate the interface
import { CreateTasksDto } from '../dtos/create-tasks.dto';
import { UpdateTasksDto } from '../dtos/update-tasks.dto';
import { Tasks } from '../entities/tasks.entity';

export interface ITasksController {
  create(createTasksDto: CreateTasksDto): Promise<Tasks>;

  getMe(tasks: Tasks): Promise<Tasks>;

  findOne(tasksId: string): Promise<Tasks>;

  findAll(): Promise<Tasks[]>;

  updateMe(tasks: Tasks, updateTasksDto: UpdateTasksDto): Promise<Tasks>;

  updateTasks(tasksId: string, updateTasksDto: UpdateTasksDto): Promise<Tasks>;

  remove(tasksId: string): Promise<void>;
}
