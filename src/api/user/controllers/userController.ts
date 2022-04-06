import { Request, Response } from 'express'
import { CreateUser } from '../useCases/createUser'
import { EmailInUseError } from '../useCases/errors/emailInUseError'
import { ListUser } from '../useCases/listUser'

export class UserController {
    constructor(
        private createUser: CreateUser,
        private listUser: ListUser
    ) { }

    async create(request: Request, response: Response) {
        try {
            const newUser = await this.createUser.execute(request.body)

            return response.status(201).json(newUser)
        } catch (error: any) {
            if (error instanceof EmailInUseError) {
                return response.status(400).json(error.message)
            }
            return response.status(500).json('Internal Server Error')
        }

    }
    async index(request: Request, response: Response) {

        try {

            const { page = 1, limit = 5, filted = false } = request.query

            const tasks = await this.listUser.execute(page as number, limit as number, filted as boolean)

            return response.status(200).json(tasks)

        } catch (error: any) {
            return response.status(500).json('Internal Server Error')
        }

    }
}