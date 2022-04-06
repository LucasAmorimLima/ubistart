import { UserModel } from 'src/api/user/database/models/userModel'
import { createConnections, getConnection, getRepository } from 'typeorm'
import { administratorSeed } from './seed'

class Connection {
  async  create(): Promise<void> {
    await createConnections()
    administratorSeed(getRepository(UserModel))
  } 
  async  close(): Promise<void> {
    await getConnection().close()
  }
}

export default new Connection()