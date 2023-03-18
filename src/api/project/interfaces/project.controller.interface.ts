// remove eslint comment when you start to populate the interface

import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProjectController {
  getHello(project: Project): Promise<string>;

  create(createUserDto: CreateProjectDto): Promise<Project>;

  getMe(project: Project): Promise<Project>;

  findOne(userId: string): Promise<Project>;

  findAll(): Promise<Project[]>;

  updateMe(
    project: Project,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;

  updateUser(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;

  remove(projectId: string): Promise<void>;
}
