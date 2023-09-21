import { Injectable } from '@nestjs/common';
import { ReportService } from '../report/report.service';
import { ReportType } from 'src/data';

@Injectable()
export class SumaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSumary(): any {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);
    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);
    return {
      totalIncome: 100,
      totalExpense: 10,
      netIncome: totalIncome - totalExpense,
    };
  }
}
