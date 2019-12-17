import { Module } from '@nestjs/common';
import { WelcomeModule } from './welcome/welcome.module'
import { TaskModule } from './task/task.module'

@Module({
  imports: [
    WelcomeModule,
    TaskModule
  ],
})
export class AppModule {}
