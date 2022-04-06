import { AuthUserDto } from './dto/authUserDto'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { AccessToken } from './ports/authentication'
import { UserRepository } from './ports/repositories/userRepository'


export class AuthenticateUser  {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly accessToken: AccessToken
  ) {}

  async execute (user: AuthUserDto) {
    const userExists = await this.userRepository.findByEmail(user.email)
    
    if (!userExists) {
      throw new InvalidCredentialsError('Invalid credentials.')
    }
    const token = await this.accessToken.sign(userExists.id, userExists.administrator)

    return token
  }
}
