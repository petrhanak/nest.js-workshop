import { Module } from '@nestjs/common';
import { WelcomeController } from './welcome.controller'
import { GreetingService } from './greeting.service'

@Module({
  controllers: [WelcomeController],
  providers: [GreetingService],
})
export class WelcomeModule {}
