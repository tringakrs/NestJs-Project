import { ApiProperty } from '@nestjs/swagger';
import { Type } from '../enums/type.enum';
import { IsEnum, IsString } from 'class-validator';
import { Status } from '../enums/status.enum';

export class CreateTasksDto {
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @IsString()
  @ApiProperty()
  deadline: Date;
}
