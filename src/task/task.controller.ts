import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'

@Controller('tasks')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {
  }

  @Post()
  postTask(
    @Body() body: CreateTaskDto
  ) {
    return this.taskService.createTask(body.text)
  }

  @Get()
  getTasks() {
    return this.taskService.listTasks()
  }

  @Get(':id')
  getTask(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.taskService.getTask(id)
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async postTaskComplete(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.taskService.completeTask(id)
  }

  @Post(':id/uncomplete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async postTaskUncomplete(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.taskService.uncompleteTask(id)
  }
}
