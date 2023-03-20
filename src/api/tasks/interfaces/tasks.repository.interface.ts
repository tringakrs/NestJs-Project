/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { Tasks } from '../entities/tasks.entity';

export interface ITasksRepository extends IBaseCustomRepository<Tasks> {}
