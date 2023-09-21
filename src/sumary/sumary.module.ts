import { Module } from '@nestjs/common';
import { SumaryController } from './sumary.controller';
import { SumaryService } from './sumary.service';
import { ReportService } from '../report/report.service';

@Module({
  controllers: [SumaryController],
  providers: [SumaryService, ReportService],
  // Why ReportService is imported here and on providers? The reason ?
  // The reason is that the ReportService is used by both the SumaryService and the ReportController. The SumaryService is used by the SumaryController. The ReportController is used by the ReportService.
  imports: [ReportService],
  // Why we import the ReportService? The reason is ? And why we use this syntax rather than injection manually ?
  // The reason is that the ReportService is used by both the SumaryService and the ReportController. The SumaryService is used by the SumaryController. The ReportController is used by the ReportService.
  // The syntax is used to inject the ReportService into the SumaryModule. This is the recommended way to inject a service into a module.
})
export class SumaryModule {}
