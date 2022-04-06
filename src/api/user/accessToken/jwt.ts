import jwt, { JwtPayload } from 'jsonwebtoken'
import { AccessToken } from '../useCases/ports/authentication'

export class JwtAdapter implements AccessToken {
  sign(userId: number, administrator: boolean): Promise<string> {
    const token = jwt.sign({ userId, administrator }, 'secret', { expiresIn: '7d' })
    return Promise.resolve(token)
  }

  async verify(token: string): Promise<string | JwtPayload> {
    try {
      const tokenVerify =  jwt.verify(token, 'secret')
      
      return tokenVerify
      
    } catch (error) {

      return error.name
    }
  }

}
