import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { ProjectRepository } from './repository/project.repository';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([ProjectRepository])],
  // providers: [IProjectService],
  //  controllers: [UserController],
})
export class ProjectModule {}
