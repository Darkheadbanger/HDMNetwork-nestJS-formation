import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportReponseDto } from '../dtos/report.dto';
import { ReportType } from '../data';

describe('AppController', () => {
  let reportController: ReportController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportService],
    }).compile();

    reportController = app.get<ReportController>(ReportController);
  });

  describe('getAllReports', () => {
    // 👈 new describe block
    // It should return something then expect getAllReports() toBe something with a good argument
    it('should return a list of reports of type INCOME', () => {
      const result: ReportReponseDto[] = [
        {
          id: 'uuid1',
          source: 'Salary',
          amount: expect.any(Number),
          created_at: expect.any(Date),
          updated_at: expect.any(Date),
          type: ReportType.INCOME,
          transformCreatedAt: expect.any(Date),
        },
      ];
      expect(reportController.getAllReports('income')).toBe(result);
    });
  });
});
