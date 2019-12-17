import { Test, TestingModule } from '@nestjs/testing';
import { TaskModule } from '../task.module';
import { TaskService } from '../task.service'

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile();

    taskService = app.get<TaskService>(TaskService);
  });

  it('create task', async () => {
    const text = 'Hey'
    const task = await taskService.createTask(text)

    expect(task).toMatchObject({
      id: 1,
      text,
      isCompleted: false,
    })
  });

  it('get task', async () => {
    const task = await taskService.createTask('foo')
    const result = await taskService.getTask(task.id)

    expect(result).toMatchObject(task)
  });

  it('complete task', async () => {
    const task = await taskService.createTask('foo')
    await taskService.completeTask(task.id)

    const result = await taskService.getTask(task.id)

    expect(result).toMatchObject({
      isCompleted: true
    })
  });

  it('uncomplete task', async () => {
    const task = await taskService.createTask('foo')

    await taskService.completeTask(task.id)
    await taskService.uncompleteTask(task.id)

    const result = await taskService.getTask(task.id)

    expect(result).toMatchObject({
      isCompleted: false
    })
  });

  it('list empty tasks', async () => {
    const results = await taskService.listTasks()

    expect(results).toMatchObject([])
  })

  it('list tasks', async () => {
    const task1 = await taskService.createTask('foo')
    const task2 = await taskService.createTask('bar')

    const results = await taskService.listTasks()

    expect(results).toMatchObject([
      task1,
      task2,
    ])
  })
});
