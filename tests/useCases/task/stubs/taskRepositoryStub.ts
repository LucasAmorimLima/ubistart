import { Task } from '../../../../src/api/task/entity/task';
import { CreateTaskDto } from '../../../../src/api/task/useCases/dto/createTaskDto';
import { UpdateTaskDto } from '../../../../src/api/task/useCases/dto/updateTaskDto';
import { TaskRepository } from '../../../../src/api/task/useCases/repositories/taskRepository'


export class TaskRepositoryStub implements TaskRepository {
    create(task: CreateTaskDto): Promise<Task> {
        return Promise.resolve(
            {
                id: 2,
                description: "description 1",
                term: new Date(),
                finishedAt: new Date(),
            }
        )
    }
    findById(id: number): Promise<Task> {
        return Promise.resolve(
            {
                id: 2,
                description: "description 1",
                term: new Date(),
                finishedAt: null,
            }
        )
    }
    update(task: UpdateTaskDto): Promise<Task> {
        return Promise.resolve(
            {
            id: 2,
            description: "description 1",
            term: new Date(),
            finishedAt: null,
        }
        )
    }
    finished(id: number): Promise<string> {
        return Promise.resolve("Task finished with sucessify")
    }
    index(page: number, limit: number, userId: number): Promise<Task[]> {
        return Promise.resolve([
            {
                id: 1,
                description: "description",
                term: new Date(),
                finishedAt: new Date(),
            },
            {
                id: 2,
                description: "description 1",
                term: new Date("2022-01-28T21:20:39.000Z"),
                finishedAt: new Date(),
            }
        ]
        )
    }

}