import { UserModel } from "src/api/user/database/models/userModel"
import { Repository } from "typeorm"

export const administratorSeed = (repository: Repository<UserModel>) => { 
    const administrator = repository.create({
        id: 1,
        email: "adm@gmail.com",
        password: "adm",
        administrator: true
    })
    repository.save(administrator)
}
