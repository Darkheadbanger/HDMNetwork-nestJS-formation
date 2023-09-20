import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';

@Injectable()
export class AppService {
  getAllIncomeReports(type: ReportType) {
    // 👈 new method
    return data.report.filter((report) => report.type === type);
  }
}
