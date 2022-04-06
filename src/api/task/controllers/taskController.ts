import { CreateTask } from "../useCases/createTask";
import { FinishTask } from "../useCases/finishTask";
import { ListTask } from "../useCases/listTask";
import { UpdateTask } from "../useCases/updateTask";
import { Request, Response } from 'express'
import { TaskNotFoundError } from "../useCases/errors/taskNotFoundError";
import { NoPermissionToUpdateError } from "../useCases/errors/noPermissionToUpdateError";

export class TaskController {
    constructor(
        private createTask: CreateTask,
        private updateTask: UpdateTask,
        private listTask: ListTask,
        private finishTask: FinishTask
    ) { }

    async create(request: Request, response: Response) {
        try {
            const { description, term, userId } = request.body
            const newTask = await this.createTask.execute(
                {
                    description,
                    term,
                    userId
                }
            )
            return response.status(201).json(newTask)

        } catch (error: any) {
            return response.status(500).json('Internal Server Error')
        }
    }
    async update(request: Request, response: Response) {
        try {
            const { description, term, id, userId } = request.body

            const updateTask = await this.updateTask.execute({
                description,
                term,
                id,
                userId
            })

            response.status(200).json(updateTask)
        } catch (error: any) {
            if (error instanceof TaskNotFoundError || NoPermissionToUpdateError) {
                return response.status(400).json(error.message)
            }
            return response.status(500).json('Internal Server Error')
        }
    }
    async index(request: Request, response: Response) {
        try {
            let page = 1, limit = 5
            const { query } = request
            const { userId } = request.body

            if (query.limit) {
                limit = parseInt(query.limit as string)
            }
            if (query.page) {
                page = parseInt(query.page as string)
            }

            const tasks = await this.listTask.execute(page, limit, userId)

            response.status(200).json(tasks)
        } catch (error: any) {
            return response.status(500).json('Internal Server Error')
        }
    }
    async finished(request: Request, response: Response) {
        try {
            const { id } = request.params

            const taskFinished = await this.finishTask.execute(parseInt(id))

            return response.status(200).json(taskFinished)

        } catch (error: any) {
            if (error instanceof TaskNotFoundError) {
                return response.status(400).json(error.message)
            }
            return response.status(500).json('Internal Server Error')
        }
    }
}