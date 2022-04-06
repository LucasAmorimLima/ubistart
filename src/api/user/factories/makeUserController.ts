import { Repository } from 'typeorm'
import { UserController } from '../controllers/userController'
import { UserRepositoryTypeOrm } from '../database/implementations/userRepositoryTypeOrm'
import { UserModel } from '../database/models/userModel'
import { CreateUser } from '../useCases/createUser'
import { ListUser } from '../useCases/listUser'


export const MakeUserController = (repository: Repository<UserModel>): UserController => {
    
    const userRepository = new UserRepositoryTypeOrm(repository)

    const createUser = new CreateUser(userRepository)
    const listUser = new ListUser(userRepository)

    return new UserController(createUser, listUser)
}