import { User } from '../../../../src/api/user/entity/user';
import { CreateUserDto } from '../../../../src/api/user/useCases/dto/createUserDto';
import { UserRepository } from '../../../../src/api/user/useCases/ports/repositories/userRepository'

export class UserRepositoryStub implements UserRepository {

    create(user: CreateUserDto): Promise<User> {
        return Promise.resolve(
            {
                "email": "lucas@gmail.com",
                "password": "lucas",
                "administrator": false,
                "id": 2
            }
        )
    }
    findByEmail(email: string): Promise<User> {
        return Promise.resolve(
            {
                "email": "ana@gmail.com",
                "password": "lucas",
                "administrator": false,
                "id": 2
            }
        )
    }
    listUsers(page: number, limit: number): Promise<User[]> {
        return Promise.resolve(
            [
                {
                    id: 1,
                    email: "ana@gmail.com",
                    password: "lucas",
                    administrator: false,
                    tasks: [
                        {
                            id: 2,
                            description: "description 1",
                            term: "2022-01-28T21:20:39.000Z",
                            userId: 1,
                            created_at: "2022-04-05T13:25:35.714Z",
                            updated_at: "2022-04-05T13:25:35.714Z",
                            finishedAt: "2022-04-05T13:25:35.714Z"
                        }
                    ]
                }
            ]
        ) 
    }
}