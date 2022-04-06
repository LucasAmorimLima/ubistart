import { UpdateTaskDto } from "./dto/updateTaskDto"
import { NoPermissionToUpdateError } from "./errors/noPermissionToUpdateError";
import { TaskNotFoundError } from "./errors/taskNotFoundError";
import { TaskRepository } from "./repositories/taskRepository"

export class UpdateTask {
    constructor(
        private taskRepository: TaskRepository
    ) { }
    async execute(task: UpdateTaskDto) {

        const { id } = task
        const taskForUpdated = await this.taskRepository.findById(id)

        if (!taskForUpdated) {
            throw new TaskNotFoundError("Task data is either incorrect or does not exist");
        }

        if (taskForUpdated.finishedAt) {
            throw new NoPermissionToUpdateError("Unable to update a finished activity");
        }

        const taskUpdated = await this.taskRepository.update(task)

        return taskUpdated

    }
}