/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/report.dto';
import { Response } from 'express';
import { UserRoles } from '../user/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(new RolesGuard())
@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

@Roles(UserRoles.ADMIN || UserRoles.DEVELOPER || UserRoles.MANAGER)
  @Get()
  async getReport(): Promise<Report[]> {
    return await this.reportService.getReport();
  }

  @Roles(UserRoles.DEVELOPER)
  @ApiProperty()
  @Get(':id')
  async getReportById(@Param('id') id : string) : Promise<Report>{
    return await this.reportService.getReportById(id);
  }

  @Roles(UserRoles.ADMIN || UserRoles.DEVELOPER || UserRoles.MANAGER)
  @Post()
  async create(@Body() data: CreateReportDto) {
    return await this.reportService.createReport(data);
  }


  @Roles(UserRoles.MANAGER)
  @ApiProperty()
  @Post('/addProjectToReport')
  async assignProjectToReport(@Body() data: { reportId: string, projectId: string }) {
    return this.reportService.assignProjectToReport(data);
  }

  @Roles(UserRoles.MANAGER)
  @ApiProperty()
  @Post('/addUserToReport')
  async assignUserToReport(@Body() data: {reportId: string, userId: string}): Promise<Report> {
    return this.reportService.assignUserToReport(data);
  }

  @Roles(UserRoles.DEVELOPER)
  @ApiProperty()
  @Get('project/:projectId')
  async findByProjectId(@Param('projectId') projectId: string): Promise<Report[]> {
  return await this.reportService.findByProjectId(projectId);
}

  @Roles(UserRoles.DEVELOPER)
  @ApiProperty()
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId : string) : Promise<Report[]>{
    return await this.reportService.findByUserId(userId);
  }

  @Roles(UserRoles.DEVELOPER)
  @ApiProperty()
  @Get(':id/download-pdf')
  async downloadReportPdf(@Param('id') id: string, @Res() res: Response) {
    const { fileName, stream } = await this.reportService.downloadReportPdf(id);
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', 'application/pdf');
    stream.pipe(res);
}

  @Roles(UserRoles.DEVELOPER)
  @ApiProperty()
  @Get(':id/download/excel')
  async downloadExcel(@Param('id') id: string, @Res() res: Response) {
    const { fileName, stream } = await this.reportService.downloadReportExcel(id);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    stream.pipe(res);
  }
}
