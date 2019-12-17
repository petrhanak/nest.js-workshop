import { Injectable } from '@nestjs/common';
import { ITask } from './interfaces/task.interface'

@Injectable()
export class TaskService {
  private tasks: ITask[] = []

  async createTask(text: string): Promise<ITask> {
    const task: ITask = {
      id: this.tasks.length + 1,
      text,
      isCompleted: false,
    }

    this.tasks.push(task)

    return task
  }

  async getTask(id: number) {
    return this.tasks.find(t => t.id === id)
  }

  async completeTask(id: number): Promise<void> {
    const task = await this.getTask(id)
    task.isCompleted = true
  }

  async uncompleteTask(id: number): Promise<void> {
    const task = await this.getTask(id)
    task.isCompleted = false
  }

  async listTasks(): Promise<ITask[]> {
    return this.tasks
  }s
}
