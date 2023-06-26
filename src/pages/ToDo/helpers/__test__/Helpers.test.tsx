import { describe, it, expect} from "vitest";
import {createNewTask, removeTask, toggleTaskStatus} from "../index.tsx";
describe('createNewTask', () => {
  it('deve criar uma nova tarefa com os valores corretos', () => {
    const description = 'Nova Tarefa';
    const task = createNewTask(description);

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('description', description);
    expect(task).toHaveProperty('isDone', false);
  });
  it('deve remover a tarefa correta da lista', () => {
    const taskList = [
      { id: '1', description: 'Tarefa 1', isDone: false },
      { id: '2', description: 'Tarefa 2', isDone: true },
      { id: '3', description: 'Tarefa 3', isDone: false },
    ];

    const taskIdToRemove = '2';
    const updatedTaskList = removeTask(taskList, taskIdToRemove);

    expect(updatedTaskList).toHaveLength(taskList.length - 1);
    expect(updatedTaskList).not.toContainEqual({ id: taskIdToRemove });
  });

  it('deve retornar a mesma lista se o ID da tarefa não for encontrado', () => {
    const taskList = [
      { id: '1', description: 'Tarefa 1', isDone: false },
      { id: '2', description: 'Tarefa 2', isDone: true },
    ];

    const taskIdToRemove = '3';
    const updatedTaskList = removeTask(taskList, taskIdToRemove);

    expect(updatedTaskList).toHaveLength(taskList.length);
    expect(updatedTaskList).toEqual(taskList);
  });

  it('deve alternar o status da tarefa correta', () => {
    const taskList = [
      {id: '1', description: 'Tarefa 1', isDone: false},
      {id: '2', description: 'Tarefa 2', isDone: true},
    ];

    const taskIdToToggle = '1';
    const updatedTaskList = toggleTaskStatus(taskList, taskIdToToggle);

    const toggledTask = updatedTaskList.find((task) => task.id === taskIdToToggle);

    expect(toggledTask).toHaveProperty('isDone', true);
  });

  it('não deve alterar outras tarefas na lista', () => {
    const taskList = [
      {id: '1', description: 'Tarefa 1', isDone: false},
      {id: '2', description: 'Tarefa 2', isDone: true},
    ];

    const taskIdToToggle = '1';
    const updatedTaskList = toggleTaskStatus(taskList, taskIdToToggle);

    const untouchedTask = updatedTaskList.find((task) => task.id === '2');

    expect(untouchedTask).toHaveProperty('isDone', true);
  });
});

