import { ApiProperty } from '@nestjs/swagger';
import { Type } from '../enums/type.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  utl: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(Type)
  @ApiProperty()
  type: Type;
}
