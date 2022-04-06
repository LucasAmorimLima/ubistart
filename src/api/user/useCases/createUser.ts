import { CreateUserDto } from "./dto/createUserDto"
import { EmailInUseError } from "./errors/emailInUseError"
import { UserRepository } from "./ports/repositories/userRepository"

export class CreateUser {
    constructor(
        private userRepository: UserRepository
    ) { }

    async execute(user: CreateUserDto) {
        
        const haveEmail = await this.userRepository.findByEmail(user.email)

        if (haveEmail) {
            throw new EmailInUseError("Email ahead in use, please insert another email.")
        }

        const newUser = await this.userRepository.create(user)

        return newUser

    }
}