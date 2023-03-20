/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/tasks.entity';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { UpdateTasksDto } from './dtos/update-tasks.dto';

  @ApiTags('Tasks')
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
    @Public()
    @Get()
    async getTasks(): Promise<Tasks[]> {
      return await this.tasksService.getTasks();
    }
    
    @Public()
    @Post()
    async create(@Body() data: CreateTasksDto) {
      return await this.tasksService.createTasks(data);
    }
    
    @Public()
    @Get(':id')
    async getTasksById(@Param('id') id: string): Promise<Tasks> {
      return await this.tasksService.getTasksById(id);
    }
  
    @Public()
    @Put(':id')
    async updateTasks(@Param('id') id:string , @Body() data:UpdateTasksDto) :Promise<Tasks>{
      return await this.tasksService.updateTasks(id,data);
    }
  
    @Public()
    @Delete(':id')
    async removeTasks(@Param('id') id: string): Promise<void> {
      return await this.tasksService.removeTasks(id);
    }

    @Public()
    @Post(':id/users/:userId')
    async addUserToTasks(@Param('id') tasksId: string, @Param('userId') userId: string): Promise<void> {
    return await this.tasksService.addUserToTasks(tasksId, userId);
    }
  }
  