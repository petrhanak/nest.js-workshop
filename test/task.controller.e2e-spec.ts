import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { TaskService } from '../src/task/task.service'
import { UserService } from '../src/user/user.service'
import { UserServiceMock } from '../src/user/user.service.mock'
import { Connection } from 'typeorm'


describe('TaskController (e2e)', () => {
  let databaseConnection: Connection
  let taskService: TaskService
  let app

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useClass(UserServiceMock)
      .compile()

    databaseConnection = moduleFixture.get('Connection')
    taskService = moduleFixture.get(TaskService)
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    await databaseConnection.synchronize(true)
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  it('create task', async () => {
    const text = 'Hey'
    const token = UserServiceMock.createToken('foo', 'bar')

    await request(app.getHttpServer())
      .post(`/tasks`)
      .set('authorization', `Basic ${token}`)
      .send({ text })
      .expect(201, {
        id: 1,
        text,
        isCompleted: false,
      })
  })

  it('create task fails with invalid body', async () => {
    const token = UserServiceMock.createToken('foo', 'bar')

    await request(app.getHttpServer())
      .post(`/tasks`)
      .set('authorization', `Basic ${token}`)
      .send({ text: {
        someWeirdData: 'nope'
        } })
      .expect(400)
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
