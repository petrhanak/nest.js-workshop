import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { TaskService } from '../src/task/task.service'

describe('TaskController (e2e)', () => {
  let taskService: TaskService
  let app

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    taskService = moduleFixture.get(TaskService)
    app = moduleFixture.createNestApplication()
    await app.init()
  })


  it('create task', async () => {
    const text = 'Hey'

    await request(app.getHttpServer())
      .post(`/tasks`)
      .send({ text })
      .expect(201, {
        id: 1,
        text,
        isCompleted: false,
      })
  })

  it('list empty tasks', async () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect([])
  })

  it('list tasks', async () => {
    const task1 = await taskService.createTask('foo')
    const task2 = await taskService.createTask('bar')

    const {body} = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200)

    expect(body).toMatchObject([
      task1,
      task2,
    ])
  })

  it('get task', async () => {
    const task = await taskService.createTask('foo')

    const { body } = await request(app.getHttpServer())
      .get(`/tasks/${task.id}`)
      .expect(200)

    expect(body).toMatchObject(task)
  })

  it('complete task', async () => {
    const task = await taskService.createTask('foo')

    return request(app.getHttpServer())
      .post(`/tasks/${task.id}/complete`)
      .expect(204)
  })

  it('uncomplete task', async () => {
    const task = await taskService.createTask('foo')

    await taskService.completeTask(task.id)

    return request(app.getHttpServer())
      .post(`/tasks/${task.id}/uncomplete`)
      .expect(204)
  })
})