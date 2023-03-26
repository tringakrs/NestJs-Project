import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from '../enums/type.enum';
import { Project } from '../entities/project.entity';

export class UpdateProjectDto implements Partial<Project> {
  @IsString()
  @IsOptional()
  @ApiProperty()
  url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsEnum(Type, {
    message: `type must be a valid value (${Object.values(Type).join(', ')})`,
  })
  @IsOptional()
  @ApiProperty()
  type?: Type;
}
