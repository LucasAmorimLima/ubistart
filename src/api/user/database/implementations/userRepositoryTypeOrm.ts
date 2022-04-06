import { User } from "../../entity/user";
import { CreateUserDto } from "../../useCases/dto/createUserDto";
import { Repository } from 'typeorm'
import { UserRepository } from "../../useCases/ports/repositories/userRepository";
import { UserModel } from "../models/userModel";

export class UserRepositoryTypeOrm implements UserRepository {

    constructor(
        private repository: Repository<UserModel>
    ) { }

    async findByEmail(email: string): Promise<User | undefined> {

        return await this.repository.findOne({
            where: {
                email: email
            }
        })
    }
    async listUsers(page: number, limit: number){
        return await this.repository.find({
            skip: ((page-1)*limit),
            take: limit,
            relations: ['tasks'],
            
        },
        )
    }
    async create(user: CreateUserDto): Promise<User> {
        const newUser = this.repository.create(
            {
                ...user,
                administrator: false
            }
        )

        return await this.repository.save(newUser)
    }
}
