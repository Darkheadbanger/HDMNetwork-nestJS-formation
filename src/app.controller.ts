import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuidv4 } from 'uuid';
import { AppService } from './app.service';

@Controller('report/:type') // 👈 new start endpoint, @Controller() decorator is used to define the controller
// Ici, :type est un paramètre dynamique qui peut être income ou expense donc pour accéder a cette route la méthode, il faut utiliser le décorteur @Param('type') type: string
export class AppController {
  constructor(private readonly appService: AppService) {} // 👈 new constructor

  @Get() // 👈 new GET endpoint /report/income by default
  @HttpCode(200) // Ok for Get
  getAllIncomeReports(@Param('type') type: string): object {
    // @Param('type') type: string est un paramètre de type string qui est passé en paramètre de la fonction getAllIncomeReports
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllIncomeReports(reportType);
  }

  @Get(':id') // 👈 new GET endpoint /report/income/:id
  @HttpCode(200) // Ok for Get
  getAllIncomeReportsById(
    @Param('type') type: string,
    @Param('id') id: string,
  ): object {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.find(
      (report) => report.type === reportType && report.id === id,
    );
  }

  @Post() // 👈 new POST endpoint /report/income/:id
  @HttpCode(201) // Created for Post
  createIncomeReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ): object {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    // Create, toujours utiliser la méthode push pour ajouter un élément dans un tableau/basse de données en JS et utiliserle décorateur @Post() pour créer une nouvelle entrée et utiliser @Body() pour récupérer les données de la requête
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id') // 👈 new PUT endpoint /report/income/:id
  @HttpCode(200) // Ok for Get
  updateIncomeReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ): object {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    if (!reportToUpdate) {
      throw new NotFoundException("Report dosen't exist");
    } else {
      const reportIndex = data.report.findIndex(
        (report) => report.id === reportToUpdate.id,
      );

      data.report[reportIndex] = {
        ...data.report[reportIndex],
        ...body,
      };

      return data.report[reportIndex];
    }
  }
  @Delete(':id')
  @HttpCode(204)
  deleteIncomeReport(@Param('id') id: string): void {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw new NotFoundException(`Report with this id ${id} doesn't exist`);
    } else {
      data.report.splice(reportIndex, 1);
      console.log(`Report with id ${id} has been deleted`);
      return;
    }
  }
}
