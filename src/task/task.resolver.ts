import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from './task.service'
import { ParseIntPipe } from '@nestjs/common'
import { Task } from './model/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { ArgsType } from 'type-graphql'

@Resolver('Task')
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Mutation(() => Task)
  createTask(
    @Args('data') args: CreateTaskDto
  ) {
    return this.taskService.createTask(args.text)
  }

  @Query(() => [Task])
  listTasks() {
    return this.taskService.listTasks()
  }

  @Query(() => Task)
  getTask(
    @Args('id', ParseIntPipe) id: number
  ) {
    return this.taskService.getTask(id)
  }

  @Mutation(() => Boolean)
  async completeTask(
    @Args('id', ParseIntPipe) id: number
  ) {
    await this.taskService.completeTask(id)
    return true
  }

  @Mutation(() => Boolean)
  async uncompleteTask(
    @Args('id', ParseIntPipe) id: number
  ) {
    await this.taskService.uncompleteTask(id)
    return true
  }
}