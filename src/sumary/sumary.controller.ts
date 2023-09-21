import { Controller, Get } from '@nestjs/common';

@Controller('sumary')
export class SumaryController {
  constructor(private readonly sumaryService: SumaryController) {}

  @Get()
  getSumary(): string {
    return this.sumaryService.getSumary();
  }
}
