import { Module } from '@nestjs/common';
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
