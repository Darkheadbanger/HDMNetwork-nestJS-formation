import { Injectable, NotFoundException } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuidv4 } from 'uuid';
import { ReportReponseDto, UpdateReportDto } from 'src/dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportReponseDto[] {
    // 👈 new method
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportReponseDto(report));
  }

  getReportsById(type: ReportType, id: string): ReportReponseDto {
    const reportById = data.report.find(
      (report) => report.type === type && report.id === id,
    );
    if (!reportById) {
      new NotFoundException("Report dosen't exist");
    } else {
      return new ReportReponseDto(reportById);
    }
  }

  createReport(
    type: ReportType,
    { amount, source }: { amount: number; source: string },
  ): ReportReponseDto {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportReponseDto(newReport);
    // Solution est de faire cela. Mais il existe une autre solution plus simple et plus propre en utilisant le DTO de nestJS
    // return {
    //   id: newReport.id,
    //   amount: newReport.amount,
    //   source: newReport.source,
    //   updated_at: newReport.updated_at,
    //   type: newReport.type,
    // };
    // ou
    // return {
    //   ...newReport,
    // };
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportDto,
  ): ReportReponseDto {
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

      return new ReportReponseDto(data.report[reportIndex]);

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
