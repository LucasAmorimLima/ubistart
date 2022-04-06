import { JwtAdapter } from "../accessToken/jwt";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export const MakeAuthMiddleware = (): AuthMiddleware => {

    const jwt = new JwtAdapter()

    return new AuthMiddleware(jwt)
}