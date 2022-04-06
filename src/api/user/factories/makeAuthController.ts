import { Repository } from "typeorm";
import { JwtAdapter } from "../accessToken/jwt";
import { AuthController } from "../controllers/authController";
import { UserRepositoryTypeOrm } from "../database/implementations/userRepositoryTypeOrm";
import { UserModel } from "../database/models/userModel";
import { AuthenticateUser } from "../useCases/authenticateUser";

export const MakeAuthController = (repository: Repository<UserModel>): AuthController => {
    const userRepository = new UserRepositoryTypeOrm(repository)
    const jwt = new JwtAdapter()
    const authenticateUser = new AuthenticateUser(userRepository, jwt)

    return new AuthController(authenticateUser)
}