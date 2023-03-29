/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationInterceptor } from '../../common/interceptors/pagination.interceptor';
import { Public } from '../../common/decorators/public.decorator';

@UseGuards(new RolesGuard())
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post()
  async create(@Body() data: CreateRoleDto) {
    return await this.roleService.create(data);
  }

  @Public()
  @UseInterceptors(PaginationInterceptor)
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return await this.roleService.update(id, data);
  }

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }
}
