import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from '../data';

import { ReportService } from './report.service';
// Import DTOS
import {
  CreateReportDto,
  ReportReponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {} // 👈 new constructor

  @HttpCode(200) // Ok for Get
  @Get() // 👈 new GET endpoint /report/income by default
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportReponseDto[] {
    // @Param('type') type: string est un paramètre de type string qui est passé en paramètre de la fonction getAllIncomeReports
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @HttpCode(200) // Ok for Get
  @Get(':id') // 👈 new GET endpoint /report/income/:id
  getReportsById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportReponseDto {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportsById(reportType, id);
  }

  @HttpCode(201) // Created for Post
  @Post() // 👈 new POST endpoint /report/income/:id
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportReponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    // Create, toujours utiliser la méthode push pour ajouter un élément dans un tableau/basse de données en JS et utiliserle décorateur @Post() pour créer une nouvelle entrée et utiliser @Body() pour récupérer les données de la requête
    return this.reportService.createReport(reportType, { amount, source });
  }

  @HttpCode(200) // Ok for Get
  @Put(':id') // 👈 new PUT endpoint /report/income/:id
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportReponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  // Create snippet for deleteReport
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
