import { TaskRepositoryStub } from "./stubs/taskRepositoryStub"
import { FinishTask } from '../../../src/api/task/useCases/finishTask'
import { TaskNotFoundError } from "../../../src/api/task/useCases/errors/taskNotFoundError"

const makeSut = () => {
    const taskRepositoryStub = new TaskRepositoryStub()
    const finishTask = new FinishTask(taskRepositoryStub)

    return {
        taskRepositoryStub,
        finishTask
    }
}

describe('FinishTask', () => {

    it("shoud call finishTask with corrects params", async () => {
        const { finishTask } = makeSut()

        const result = await finishTask.execute(1)

        expect(result).toBe("Task finished with sucessify")
    })
    it('should throw TaskNotFoundError', async () => {
        const { finishTask, taskRepositoryStub } = makeSut()

        jest.spyOn(taskRepositoryStub, 'findById').mockReturnValueOnce(Promise.resolve(null))
        const result = finishTask.execute(6)//wrong id

        await expect(result).rejects.toThrow(TaskNotFoundError)
    })

})