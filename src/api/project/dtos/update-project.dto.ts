import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from '../enums/type.enum';
import { Status } from '../../tasks/enums/status.enum';

export class UpdateProjectDto {
  @IsEnum(Type, {
    message: `type must be a valid value (${Object.values(Type).join(', ')})`,
  })
  @IsOptional()
  @ApiProperty()
  type: Type;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsEnum(Status, {
    message: `type must be a valid value (${Object.values(Status).join(', ')})`,
  })
  @IsOptional()
  @ApiProperty()
  status: Status;

  @IsString()
  @IsOptional()
  @ApiProperty()
  deadline: Date;
}
