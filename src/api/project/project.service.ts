/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repository/project.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository, 
    private readonly userService: UserService) {}
  
  async getProject(): Promise<Project[]> {
    const projects = await this.projectRepository.getProject();
    if (!projects || projects.length === 0) {
      throw new NotFoundException('No projects found');
    }
    return projects;
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = await this.projectRepository.getProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  async createProject(createProjectDto : CreateProjectDto): Promise<Project>{
    const projectExists = await this.projectRepository.findOneBy({ name: createProjectDto.name });

      if (projectExists) {
        throw new ConflictException(`A project with name ${createProjectDto.name} already exists`);
      }

    return await this.projectRepository.createProject(createProjectDto);
  }

  async updateProject(uuid: string, updateProjectDto : UpdateProjectDto) : Promise<Project>{
    const project = await this.getProjectById(uuid);

      if (!project) {
        throw new NotFoundException('Project not found');
      }

    return await this.projectRepository.updateProject(uuid, updateProjectDto);
  }
  
  async removeProject(projectId:string) : Promise<void>{
    const project = await this.getProjectById(projectId);
     if(!project) 
       throw new NotFoundException('Project not found');
     await this.projectRepository.removeProject(projectId);
  }

  async assignUsersToProjects(projectId: string, userId: string[],) : Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        uuid: projectId,
      },
      relations: ['users'],
    });

      if (!project)
        throw new NotFoundException('Project not found');
      if (!userId || userId.length === 0) 
        return project;

    const users = await this.userService.findUsersByIds(userId);

      if (users.length === 0) 
        throw new NotFoundException('User(s) not found');

    project.users = [...project.users, ...users];
    await this.projectRepository.createProject(project);
    return project;
  }
}
