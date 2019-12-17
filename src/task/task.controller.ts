import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { TaskService } from './task.service'
import { constants } from 'http2'
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
    @Param('id') id: string
  ) {
    return this.taskService.getTask(
      parseInt(id, 10)
    )
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async postTaskComplete(
    @Param('id') id: string
  ) {
    await this.taskService.completeTask(
      parseInt(id, 10)
    )
  }

  @Post(':id/uncomplete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async postTaskUncomplete(
    @Param('id') id: string
  ) {
    await this.taskService.uncompleteTask(
      parseInt(id, 10)
    )
  }
}
