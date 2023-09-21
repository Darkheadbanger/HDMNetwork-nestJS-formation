import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
// Donc, le module est un conteneur pour un groupe de contrôleurs liés à un domaine spécifique. Il est lié à un composant racine, AppModule, qui associe un contrôleur à un chemin d'URL spécifique. Dans ce cas, le contrôleur est AppController et le chemin d'URL est /report/income.
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  // Ici, on importe les contrôleurs et les services dans le module
  // providers est AppService qui continent les logiques méties, pour ensuite les injecter dans les contrôleurs.
})
export class AppModule {}
