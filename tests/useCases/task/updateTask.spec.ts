import { TaskRepositoryStub } from "./stubs/taskRepositoryStub"
import { UpdateTask } from '../../../src/api/task/useCases/updateTask'
import { TaskNotFoundError } from "../../../src/api/task/useCases/errors/taskNotFoundError"
import { NoPermissionToUpdateError } from "../../../src/api/task/useCases/errors/noPermissionToUpdateError"
const makeSut = () => {
    const taskRepositoryStub = new TaskRepositoryStub()
    const updateTask = new UpdateTask(taskRepositoryStub)

    return {
        taskRepositoryStub,
        updateTask
    }
}

describe('UpdateTask', () => {

    it("shoud call updateTask with corrects params", async () => {
        const { updateTask } = makeSut()
        const task =  {
            id: 2,
            description: "description 1",
            term: new Date(),
            finishedAt: null,
            userId: 1
        }
        
        const result = await updateTask.execute(task)

        expect(result.id).toBe(task.id)
    })
    it('should throw TaskNotFoundError', async () => {
        const { updateTask, taskRepositoryStub } = makeSut()
        const task =  {
            id: 2,
            description: "description 1",
            term: new Date(),
            finishedAt: null,
            userId: 1
        }
        jest.spyOn(taskRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(null))
        const result = updateTask.execute(task)

        await expect(result).rejects.toThrow(TaskNotFoundError)
    })
    it('should throw NoPermissionToUpdateError', async () => {
        const { updateTask, taskRepositoryStub } = makeSut()
        const task =  {
            id: 2,
            description: "description 1",
            term: new Date(),
            finishedAt: null,
            userId: 1
        }
        jest.spyOn(taskRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(
            {
                id: 2,
                description: "description 1",
                term: new Date(),
                finishedAt: new Date(),
                userId: 1
            }
        ))
        const result = updateTask.execute(task)

        await expect(result).rejects.toThrow(NoPermissionToUpdateError)
    })
})