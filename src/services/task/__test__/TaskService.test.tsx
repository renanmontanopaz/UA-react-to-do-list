import {beforeAll, describe, expect, it} from "vitest";
import MockAdapter from "axios-mock-adapter";
import {api} from "../../../configs/api";
import {Task} from "../../../models/Task.ts";
import {changeIsDone, createTask, deleteTask, getTasks} from "../index.ts";

const mock = new MockAdapter(api);
describe("<Task Services>", () =>{
  
  beforeAll(() => {
    mock.reset();
  })
  
  it("Deve retornar uma lista de tarefas", async() => {
    const tasks: Task[] = [{id: '01', description: 'teste 01', isDone: false},
      {id: '02', description: 'teste 02', isDone: false},
      {id: '03', description: 'teste 03', isDone: true}]  
    
    mock.onGet("/tasks").reply(200, tasks);
    
    const response = await getTasks();
    console.log(response)
    expect(response).toEqual(tasks);
  })
  
  it("CreateTask deve retornar uma nova tarefa", async() => {
    const tasks: Task = {id: '01', description: 'teste 01', isDone: false};
    mock.onPost("/tasks").reply(201, tasks);
    const response = await createTask(tasks);
    console.log(response);
    expect(response).toEqual(tasks);
  })

  it("DeleteTask deve deletar uma tarefa", async() => {
    mock.onDelete("/tasks/1").reply(200);
    await expect(deleteTask("1")).resolves.toBeUndefined();
  })

  it("ChangeIsDone deve retornar uma task alterada", async() => {
    const task: Task = {id: '01', description: 'teste 01', isDone: true};
    mock.onPatch("/tasks/1").reply(200, task);
  const response = await changeIsDone("1", {isDone: true});
    console.log(response);
    expect(response).toEqual(task);
  })
})