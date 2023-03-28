import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { ProjectRepository } from './repository/project.repository';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([ProjectRepository]),
    UserModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
