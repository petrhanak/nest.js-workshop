import { Module } from '@nestjs/common';
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { UserModule } from '../user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
