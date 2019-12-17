import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { TaskService } from './task.service'
import { constants } from 'http2'

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {
  }

  @Post()
  postTask(
    @Body() body: any
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
