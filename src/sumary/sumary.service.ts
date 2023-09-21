import { Injectable } from '@nestjs/common';

@Injectable()
export class SumaryService {
  calculateSumary(): string {
    return 'This action returns a sumary';
  }
}
