import { UserRepository } from "./ports/repositories/userRepository"

export class ListUser {
    constructor(
        private userRepository: UserRepository
    ) { }
    async execute(page: number, limit: number, filted : boolean) {
        
        const users = await this.userRepository.listUsers(page, limit)

        const usersClean = users.reduce((acc, cur) => {
            return [
                ...acc,
                {
                    email: cur.email,
                    tasks: cur.tasks.filter((task) => {
                        if (filted) {
                            const now = new Date()
                            if (task.term < now) {
                                return {
                                    description: task.description,
                                    term: task.term,
                                }
                            }
                        }else{
                            return {
                                description: task.description,
                                term: task.term,
                            }
                        }
                        
                    })
                }
            ]
        }, [])

        return usersClean

    }
}