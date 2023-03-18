/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repository/project.repository';

/* eslint-disable prettier/prettier */
@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async getProject(): Promise<Project[]> {
    return await this.projectRepository.getProject();
  }
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.createProject(createProjectDto);
  }
  async getProjectById(projectId: string): Promise<Project> {
    return await this.projectRepository.getProjectById(projectId);
  }

    async updateProject(projectId: string, updateProjectDto : UpdateProjectDto) : Promise<Project>{
      return await this.projectRepository.updateProject(projectId,updateProjectDto)
    }

  async removeProject(projectId: string): Promise<void> {
    return await this.projectRepository.removeProject(projectId);
  }
}
