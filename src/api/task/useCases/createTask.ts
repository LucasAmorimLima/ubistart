import { CreateTaskDto } from "./dto/createTaskDto"
import { TaskRepository } from "./repositories/taskRepository"

export class CreateTask {
    constructor(
        private taskRepository: TaskRepository
    ) { }
    async execute(task: CreateTaskDto) {
        const newTask = await this.taskRepository.create(task)

        return newTask

    }
}