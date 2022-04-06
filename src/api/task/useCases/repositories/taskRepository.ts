import { Task } from "../../entity/task";
import { CreateTaskDto } from "../dto/createTaskDto";
import { UpdateTaskDto } from "../dto/updateTaskDto";

export interface TaskRepository {
    create(task: CreateTaskDto): Promise<Task>
    findById(id: number): Promise<Task>
    update(task: UpdateTaskDto): Promise<Task>
    finished(id: number): Promise<string>
    index(page: number, limit: number, userId: number): Promise<Task[]>
}