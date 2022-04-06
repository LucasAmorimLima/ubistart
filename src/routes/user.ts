import { Router, Request, Response, NextFunction } from 'express'
import { UserModel } from '../api/user/database/models/userModel'
import { MakeAuthController } from '../api/user/factories/makeAuthController'
import { MakeAuthMiddleware } from '../api/user/factories/makeAuthMiddleware'
import { getRepository } from 'typeorm'
import { MakeUserController } from '../api/user/factories/makeUserController'

const userRouter = Router()

const administrator = true

userRouter.post('/user', (httpRequest: Request, httpResponse: Response) =>
    MakeUserController(getRepository(UserModel)).create(httpRequest, httpResponse)
)
userRouter.get('/user',
    (httpRequest: Request, httpResponse: Response, next: NextFunction) =>
        MakeAuthMiddleware().execute(httpRequest, httpResponse, next, administrator)
    ,
    (httpRequest: Request, httpResponse: Response) =>
        MakeUserController(getRepository(UserModel)).index(httpRequest, httpResponse)
)
userRouter.post('/user/login', (httpRequest: Request, httpResponse: Response) =>
    MakeAuthController(getRepository(UserModel)).login(httpRequest, httpResponse)
)
export default userRouter