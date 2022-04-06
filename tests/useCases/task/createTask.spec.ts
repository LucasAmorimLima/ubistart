import { TaskRepositoryStub } from "./stubs/taskRepositoryStub"
import { CreateTask } from '../../../src/api/task/useCases/createTask'
const makeSut = () => {
    const taskRepositoryStub = new TaskRepositoryStub()
    const createTask = new CreateTask(taskRepositoryStub)

    return {
        taskRepositoryStub,
        createTask
    }
}

describe('CreateTask', () => {

    it("shoud call createTask with corrects params", async () => {
        const { createTask } = makeSut()
        const task =  {
            id: 2,
            description: "description 1",
            term: new Date(),
            finishedAt: new Date(),
            userId: 1
        }
        
        const result = await createTask.execute(task)

        expect(result.id).toBe(task.id)
    })
})