import { InvalidCredentialsError } from '../useCases/errors/invalidCredentialsError'
import { AuthenticateUser } from '../useCases/authenticateUser'
import { Request, Response } from 'express'

export class AuthController {
    constructor(

        private readonly authenticateUser: AuthenticateUser
    ) { }

    async login(request: Request, response: Response) {
        try {

            const accessToken = await this.authenticateUser.execute(request.body)
            
            return response.status(200).json(accessToken)

        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                return response.status(400).json(error.message)
            }
            return response.status(500).json('Internal Server Error')
        }
    }
}
