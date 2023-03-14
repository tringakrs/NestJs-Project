// remove eslint comment when you start to populate the interface

import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../entities/project.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProjectService {
  create(createUserDto: CreateProjectDto): Promise<Project>;

  findOne(userId: string): Promise<Project>;

  findAll(): Promise<Project[]>;

  update(projectId: string, updateUserDto: UpdateProjectDto): Promise<Project>;

  remove(projectId: string): Promise<void>;
}
