import { Test, TestingModule } from '@nestjs/testing';
import { SumaryController } from './sumary.controller';

describe('SumaryController', () => {
  let controller: SumaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SumaryController],
    }).compile();

    controller = module.get<SumaryController>(SumaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
