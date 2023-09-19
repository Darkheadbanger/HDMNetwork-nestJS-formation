import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
// We don't use patch for the moment
@Controller('report/:type') // 👈 new start endpoint, @Controller() decorator is used to define the controller
export class AppController {
  @Get() // 👈 new GET endpoint /report/income by default
  getAllIncomeReports(): [] {
    return [];
  }
  @Get(':id') // 👈 new GET endpoint /report/income/:id
  getAllIncomeReportsById(): object {
    return {};
  }
  @Post(':id') // 👈 new POST endpoint /report/income/:id
  createIncomeReport(): string {
    return 'create an income report';
  }
  @Put()
  updateIncomeReport(): string {
    return 'update an income report';
  }
  @Delete(':id')
  patchIncomeReport(): string {
    return 'delete an income report';
  }
}
