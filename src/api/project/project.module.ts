import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { ProjectRepository } from './repository/project.repository';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([ProjectRepository])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
