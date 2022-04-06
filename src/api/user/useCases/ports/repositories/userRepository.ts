import { UserModel } from "src/api/user/database/models/userModel";
import { User } from "../../../entity/user";
import { CreateUserDto } from "../../dto/createUserDto";

export interface UserRepository {
    create(user: CreateUserDto): Promise<User>
    findByEmail(email: string): Promise<User | undefined>
    listUsers(page:number, limit: number): Promise<UserModel[]>
}