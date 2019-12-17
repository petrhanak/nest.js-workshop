import { Module } from '@nestjs/common';
import { WelcomeModule } from './welcome/welcome.module'

@Module({
  imports: [WelcomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
