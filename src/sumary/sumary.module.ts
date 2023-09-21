import { Module } from '@nestjs/common';
import { SumaryController } from './sumary.controller';

@Module({
  controllers: [SumaryController],
})
export class SumaryModule {}
