import { TaskRepository } from "./repositories/taskRepository"

export class ListTask {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute(page: number, limit: number, userId: number) {

        const tasks: any = await this.taskRepository.index(page, limit, userId)

        for (let index = 0; index < tasks.length; index++) {
            const now = new Date()
            let status = 'active'

            if (tasks[index].term < now) {
                status = 'late'
            }
            tasks[index] = {
                ...tasks[index],
                status
            }
        }

        return tasks

    }
}

