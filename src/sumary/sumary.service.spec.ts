import { Test, TestingModule } from '@nestjs/testing';
import { SumaryService } from './sumary.service';

describe('SumaryService', () => {
  let service: SumaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SumaryService],
    }).compile();

    service = module.get<SumaryService>(SumaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
