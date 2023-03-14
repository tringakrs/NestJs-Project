import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  url: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsEnum(Project)
  @IsOptional()
  @ApiProperty()
  type: Type;
}
