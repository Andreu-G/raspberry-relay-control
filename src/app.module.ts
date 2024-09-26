import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RelayController } from './controllers/relay.controller';
import { RelayService } from './services/relay.service';

@Module({
  imports: [],
  controllers: [AppController, RelayController],
  providers: [AppService, RelayService],
})
export class AppModule {}
