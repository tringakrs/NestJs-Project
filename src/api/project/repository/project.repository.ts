import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interfaces/project.repository.interface';
import { UpdateProjectDto } from '../dto/update-project.dto';

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
  //the Object.assign() method to copy the properties from the updateProjectDto object to the project object, and then saves the updated project to the database using the save() method.
  //This approach is more verbose, but it provides more control over the update process, as you can choose which properties to update and how to merge them with the existing values.

  /*
  async updateProject(id:string, data: UpdateProjectDto) :Promise<Project>{
    const project = this.getProjectById(id);
    if(!project){
        throw new HttpException('Project does not exist',404);
    }
    await this.update({uuid:id},data)
    const updated = this.getProjectById(id);
    return updated;
  }
  */
  //The second function uses the update() method of the repository to update the project with the specified id. This approach is more concise, but it updates all the properties in the data object,
  //regardless of whether they have changed or not. Also, it doesn't return the updated project object directly, so you need to retrieve it again using the getProjectById() method.

  async removeProject(projectId: string): Promise<void> {
    const project = await this.findOneBy({ uuid: projectId });
    await this.delete(project.id);
  }
}
