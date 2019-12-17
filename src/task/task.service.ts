import { Injectable } from '@nestjs/common';
import { Task } from './model/task.entity'

@Injectable()
export class TaskService {
  private tasks: Task[] = []

  async createTask(text: string): Promise<Task> {
    const task = new Task()
    task.id = this.tasks.length + 1
    task.text = text
    task.isCompleted = false

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

  async listTasks(): Promise<Task[]> {
    return this.tasks
  }s
}
