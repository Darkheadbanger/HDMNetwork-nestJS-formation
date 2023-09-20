import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Donc, le module est un conteneur pour un groupe de contrôleurs liés à un domaine spécifique. Il est lié à un composant racine, AppModule, qui associe un contrôleur à un chemin d'URL spécifique. Dans ce cas, le contrôleur est AppController et le chemin d'URL est /report/income.
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  // Ici, on importe les contrôleurs et les services dans le module
  // providers est AppService qui continent les logiques méties, pour ensuite les injecter dans les contrôleurs.
})
export class AppModule {}
