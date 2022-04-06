import { Task } from "src/api/task/entity/task";
import { CreateTaskDto } from "src/api/task/useCases/dto/createTaskDto";
import { UpdateTaskDto } from "src/api/task/useCases/dto/updateTaskDto";
import { TaskRepository } from "src/api/task/useCases/repositories/taskRepository";
import { TaskModel } from "../models/taskModel";
import { Repository } from 'typeorm'


export class TaskRepositoryTypeOrm implements TaskRepository {

    constructor(
        private repository : Repository<TaskModel>
    ) { }
    
    async findById(id: number): Promise<Task> {
        return await this.repository.findOne(id)
    }
    async finished(id: number): Promise<string> {
        await this.repository.update(
            {
                id: id
            },
            {
                finishedAt: new Date()
            }
        )

        return "Task finished with sucessify"
    }
    async index(page: number, limit: number, userId: number): Promise<Task[]> {
        return await this.repository.find({
            where: {
                userId: userId
            },
            skip: ((page-1)*limit),
            take: limit
        })
    }
    async update(task: UpdateTaskDto): Promise<Task> {

        await this.repository.update({
            id: task.id
        },
            {
                term: task.term,
                description: task.description
            }
        )
        const taskUpdated = await this.findById(task.id)
        return taskUpdated
    }
    async create(task: CreateTaskDto): Promise<Task> {
        
        const newTask = this.repository.create(task)
        
        return await this.repository.save(newTask)
    }
}