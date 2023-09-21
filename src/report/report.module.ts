import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [ReportController],
  providers: [
    ReportService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  // Ici, on importe les contrôleurs et les services dans le module
  // providers est AppService qui continent les logiques méties, pour ensuite les injecter dans les contrôleurs.
})
export class ReportModule {}
