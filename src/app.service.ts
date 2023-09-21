import { Injectable, NotFoundException } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuidv4 } from 'uuid';
import { UpdateReportDto } from './dtos/report.dto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType): object {
    // 👈 new method
    return data.report.filter((report) => report.type === type);
  }

  getAllReportsById(type: ReportType, id: string): object {
    return data.report.find(
      (report) => report.type === type && report.id === id,
    );
  }

  createReport(
    type: ReportType,
    { amount, source }: { amount: number; source: string },
  ): object {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReportDto): object {
    const reportToUpdate = data.report.find(
      (report) => report.type === type && report.id === id,
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
        updated_at: new Date(),
      };

      return data.report[reportIndex];

      // 👈 new method
    }
  }

  deleteReport(id: string) {
    // 👈 new method
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
