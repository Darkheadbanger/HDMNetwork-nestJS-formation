import { Controller, Get } from '@nestjs/common';
import { SumaryService } from './sumary.service';

@Controller('summary')
export class SumaryController {
  constructor(private readonly sumaryService: SumaryService) {}

  @Get()
  getSumary(): string {
    return this.sumaryService.calculateSumary();
  }
}
