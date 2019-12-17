import { Injectable } from '@nestjs/common';
import { Task } from './model/task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {
  }

  async createTask(text: string): Promise<Task> {
    const task = await this.taskRepository.saveTask(text, false)

    return task
  }

  async getTask(id: number) {
    return this.taskRepository.findOne(id)
  }

  async completeTask(id: number): Promise<void> {
    await this.taskRepository.update(id, {
      isCompleted: true,
    })
  }

  async uncompleteTask(id: number): Promise<void> {
    await this.taskRepository.update(id, {
      isCompleted: false,
    })
  }

  async listTasks(): Promise<Task[]> {
    return this.taskRepository.find()
  }s
}
