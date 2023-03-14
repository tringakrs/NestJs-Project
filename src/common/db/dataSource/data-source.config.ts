import 'dotenv/config';
import { dirname } from 'path';
import { User } from '../../../api/user/entities/user.entity';
import { PasswordReset } from '../../../api/user/entities/reset-password.entity';
import { Roles } from '../../decorators/roles.decorator';
import { ProjectModule } from '../../../api/project/project.module';
import { Project } from 'src/api/project/entities/project.entity';

export const config = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_NAME,
  synchronize: true,
  dropSchema: false,
  entities: [User, PasswordReset, Project],
  //ktu osht bo ndrrimi qe me u bo prej dinamik ne statik edhe me bo ne windows
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: [User],
};

export const configNoEntities = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  entities: [User, PasswordReset, Project],
  //edhe ktu duhet me ndrru tani me fshi dist me bo npm run build edhe npm run build
  database: process.env.TYPEORM_NAME,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: [User],
};
