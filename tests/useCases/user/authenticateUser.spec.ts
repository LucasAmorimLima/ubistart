import { UserRepositoryStub } from "./stubs/userRepositoryStub"
import { AuthenticateUser } from '../../../src/api/user/useCases/authenticateUser'
import { JwtAdapter } from '../../../src/api/user/accessToken/jwt'
import { InvalidCredentialsError } from "../../../src/api/user/useCases/errors/invalidCredentialsError"

const makeSut = () => {
    const userRepositoryStub = new UserRepositoryStub()
    const accessToken = new JwtAdapter()
    const authenticateUser = new AuthenticateUser(userRepositoryStub, accessToken)

    return {
        userRepositoryStub,
        authenticateUser
    }
}

describe('AuthenticateUser', () => {

    it("shoud call AuthenticateUser with corrects params", async () => {
        const { authenticateUser } = makeSut()
        const user = {
            "email": "ana@gmail.com",
            "password": "lucas",
        }
        
        const result = await authenticateUser.execute(user)
        
        expect(result).toBeTruthy()
    })
    it('should throw InvalidCredentialsError', async () => {
        const { authenticateUser, userRepositoryStub } = makeSut()
        const user = {
            "email": "joana@gmail.com",
            "password": "lucas",
        }
        jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(null))
        const result = authenticateUser.execute(user)

        await expect(result).rejects.toThrow(InvalidCredentialsError)
    })
})