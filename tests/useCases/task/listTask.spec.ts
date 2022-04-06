import { TaskRepositoryStub } from "./stubs/taskRepositoryStub"
import { ListTask } from '../../../src/api/task/useCases/listTask'

const makeSut = () => {
    const taskRepositoryStub = new TaskRepositoryStub()
    const listTask = new ListTask(taskRepositoryStub)

    return {
        taskRepositoryStub,
        listTask
    }
}

describe('ListTask', () => {

    it("shoud call listTask with corrects params", async () => {
        const { listTask } = makeSut()
        const page = 1, limit = 10, userId = 1

        const result = await listTask.execute(page, limit, userId)

        expect(result[0].id).toBe(1)
    })
})