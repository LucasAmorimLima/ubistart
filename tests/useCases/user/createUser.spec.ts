import { UserRepositoryStub } from "./stubs/userRepositoryStub"
import { CreateUser } from '../../../src/api/user/useCases/createUser'
import { EmailInUseError } from "../../../src/api/user/useCases/errors/emailInUseError"

const makeSut = () => {
    const userRepositoryStub = new UserRepositoryStub()
    const createUser = new CreateUser(userRepositoryStub)

    return {
        userRepositoryStub,
        createUser
    }
}

describe('CreateUser', () => {

    it("shoud call createUser with corrects params", async () => {
        const { createUser,userRepositoryStub } = makeSut()
        const user = {
            "email": "lucas@gmail.com",
            "password": "lucas",
            "administrator": false,
            "id": 2
        }
        jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(Promise.resolve(null))
        const result = await createUser.execute(user)
        
        expect(result.email).toBe(user.email)
    })
    it('should throw EmailInUseError', async () => {
        const { createUser } = makeSut()
        const user = {
            "email": "ana@gmail.com",
            "password": "lucas",
            "administrator": false,
            "id": 2
        } // user ahead been created
        const promise = createUser.execute(user)

        await expect(promise).rejects.toThrow(EmailInUseError)
    })
})