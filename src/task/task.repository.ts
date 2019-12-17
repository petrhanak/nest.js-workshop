import { EntityRepository, Repository } from 'typeorm'
import { Task } from './model/task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async saveTask(text, isCompleted) {
    const task = new Task()
    task.text = text
    task.isCompleted = isCompleted

    return this.save(task)
  }
}