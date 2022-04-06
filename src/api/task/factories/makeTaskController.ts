import { TaskModel } from "src/api/task/database/models/taskModel";
import { Repository } from "typeorm";
import { TaskController } from "../controllers/taskController";
import { TaskRepositoryTypeOrm } from "../database/implementations/taskRepositoryTypeOrm";
import { CreateTask } from "../useCases/createTask";
import { FinishTask } from "../useCases/finishTask";
import { ListTask } from "../useCases/listTask";
import { UpdateTask } from "../useCases/updateTask";


export const makeTaskController = (repository: Repository<TaskModel>): TaskController => {

    const userRepository = new TaskRepositoryTypeOrm(repository)

    const createTask = new CreateTask(userRepository)
    const listTask = new ListTask(userRepository)
    const updateTask = new UpdateTask(userRepository)
    const finishTask = new FinishTask(userRepository)

    return new TaskController(createTask, updateTask, listTask, finishTask)
}