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
import { ReportType } from './data';
import { AppService } from './app.service';
// Import DTOS
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report/:type') // 👈 new start endpoint, @Controller() decorator is used to define the controller
// Ici, :type est un paramètre dynamique qui peut être income ou expense donc pour accéder a cette route la méthode, il faut utiliser le décorteur @Param('type') type: string
export class AppController {
  constructor(private readonly appService: AppService) {} // 👈 new constructor

  @HttpCode(200) // Ok for Get
  @Get() // 👈 new GET endpoint /report/income by default
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): object {
    // @Param('type') type: string est un paramètre de type string qui est passé en paramètre de la fonction getAllIncomeReports
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @HttpCode(200) // Ok for Get
  @Get(':id') // 👈 new GET endpoint /report/income/:id
  getAllReportsById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): object {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReportsById(reportType, id);
  }

  @HttpCode(201) // Created for Post
  @Post() // 👈 new POST endpoint /report/income/:id
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): object {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    // Create, toujours utiliser la méthode push pour ajouter un élément dans un tableau/basse de données en JS et utiliserle décorateur @Post() pour créer une nouvelle entrée et utiliser @Body() pour récupérer les données de la requête
    return this.appService.createReport(reportType, { amount, source });
  }

  @HttpCode(200) // Ok for Get
  @Put(':id') // 👈 new PUT endpoint /report/income/:id
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): object {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body);
  }

  // Create snippet for deleteReport
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
