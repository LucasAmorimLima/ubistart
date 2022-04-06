import { Router, Request, Response, NextFunction } from 'express'
import { TaskModel } from '../api/task/database/models/taskModel'
import { MakeAuthMiddleware } from '../api/user/factories/makeAuthMiddleware'
import { getRepository } from 'typeorm'
import { makeTaskController } from '../api/task/factories/makeTaskController'

const administrator = false

const taskRouter = Router()

taskRouter.use((httpRequest: Request, httpResponse: Response, next: NextFunction) =>
MakeAuthMiddleware().execute(httpRequest, httpResponse, next, administrator))

taskRouter.post('/task', (httpRequest: Request, httpResponse: Response) =>
    makeTaskController(getRepository(TaskModel)).create(httpRequest, httpResponse)
)
taskRouter.get('/task', (httpRequest: Request, httpResponse: Response) =>
    makeTaskController(getRepository(TaskModel)).index(httpRequest, httpResponse)
)
taskRouter.put('/task', (httpRequest: Request, httpResponse: Response) =>
    makeTaskController(getRepository(TaskModel)).update(httpRequest, httpResponse)
)
taskRouter.put('/task/finished/:id', (httpRequest: Request, httpResponse: Response) =>
    makeTaskController(getRepository(TaskModel)).finished(httpRequest, httpResponse)
)
export default taskRouter