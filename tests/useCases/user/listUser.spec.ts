import { UserRepositoryStub } from "./stubs/userRepositoryStub"
import { ListUser } from '../../../src/api/user/useCases/listUser'

const makeSut = () => {
    const userRepositoryStub = new UserRepositoryStub()
    const listUser = new ListUser(userRepositoryStub)

    return {
        userRepositoryStub,
        listUser
    }
}

describe('ListUser', () => {
    it("shoud call ListUser with corrects params", async () => {
        const { listUser } = makeSut()
        const page = 1, limit = 10

        const result = await listUser.execute(page, limit)
        
        expect(result[0].email).toBe("ana@gmail.com")
    })
})