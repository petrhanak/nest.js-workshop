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
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger'
import { Task } from './model/task.entity'

@Controller('tasks')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {
  }

  @Post()
  @ApiOkResponse({ type: Task })
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
  @ApiOkResponse({ type: Task })
  getTask(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.taskService.getTask(id)
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async postTaskComplete(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.taskService.completeTask(id)
  }

  @Post(':id/uncomplete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async postTaskUncomplete(
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.taskService.uncompleteTask(id)
  }
}
