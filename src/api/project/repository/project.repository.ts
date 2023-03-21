import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interfaces/project.repository.interface';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { User } from 'src/api/user/entities/user.entity';

@CustomRepository(Project)
export class ProjectRepository
  extends BaseCustomRepository<Project>
  implements IProjectRepository
{
  async getProject(): Promise<Project[]> {
    return await this.find();
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.create(createProjectDto);
    await this.save(project);
    return project;
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = await this.findOneBy({ uuid: projectId });
    if (!project) {
      throw new UnprocessableEntityException('This project does not exist!');
    }
    return project;
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new UnprocessableEntityException(
        `Project with ID ${projectId} not found`,
      );
    }
    Object.assign(project, updateProjectDto);
    await this.save(project);
    return project;
  }

  async removeProject(projectId: string): Promise<void> {
    const project = await this.findOneBy({ uuid: projectId });
    await this.delete(project.id);
  }

  async addUserToProject(projectId: string, userId: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    const user = await this.manager.findOne(User, { where: { uuid: userId } });

    project.users = [user];
    await this.save(project);
  }
}
