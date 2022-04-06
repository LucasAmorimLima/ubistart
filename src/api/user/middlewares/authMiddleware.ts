import { AccessToken } from '../useCases/ports/authentication'
import { NextFunction, Request, Response } from 'express'

export class AuthMiddleware {
    constructor(
        private readonly accessToken: AccessToken,     
    ) { }

    async execute(request: Request, response: Response, next : NextFunction, administrator: boolean): Promise<Response> {
        try {
            const accessToken = request.headers.authorization
            
            if (!accessToken) {
                return response.status(401).json(
                    {
                        name: "JsonWebTokenError",
                        message: 'Missing access token'
                    }
                ) 
            }
            const [bearer, token] = accessToken.split(' ')
            if (bearer!=="Bearer") {
                return response.status(401).json(
                    {
                        name: "JsonWebTokenError",
                        message: 'Format invalid'
                    }
                ) 
            }
            const verify: any = await this.accessToken.verify(token)

            if (verify === "JsonWebTokenError") {
                return response.status(403).json({
                    name: "JsonWebTokenError",
                    message: "invalid fileds"
                })
            }

            if (verify.administrator != administrator) {
                return response.status(403).json({
                    name: "JsonWebTokenError",
                    message: "Failed, You don't have access for this endpoint."
                })
            }
            
            request.body = {
                ...request.body,
                userId: verify.userId
            }
            
            next()
        } catch (error) {
            return response.status(403).json({
                name: "JsonWebTokenError",
                message: error.message
            })
        }
    }
}
