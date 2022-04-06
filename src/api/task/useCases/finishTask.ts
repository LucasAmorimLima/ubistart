import { TaskNotFoundError } from "./errors/taskNotFoundError";
import { TaskRepository } from "./repositories/taskRepository"

export class FinishTask {
    constructor(
        private taskRepository: TaskRepository
    ) { }
    async execute(id: number) {
        
        const taskForFinished = await this.taskRepository.findById(id)

        if (!taskForFinished) {
            throw new TaskNotFoundError("Task data is either incorrect or does not exist");
        }
        return await this.taskRepository.finished(id)
    }
}