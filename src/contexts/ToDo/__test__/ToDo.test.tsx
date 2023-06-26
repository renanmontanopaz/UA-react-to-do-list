import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import React from "react";
import ToDoContext, {ToDoContextProvider, ToDoContextProps} from "../index.tsx";
export type Task = {
  id: string;
  description: string;
  isDone: boolean;
};
describe("<ToDoContext>", () => {
  it("Deve renderizar um children quando passado por parâmetro", () => {
    render(<ToDoContextProvider>
      <h1>Testando o To do Provider</h1>
    </ToDoContextProvider>)

    const childElement = screen.getByText(/Testando o To do Provider/i);
    expect(childElement).not.toBeNull();

  })

  it("Deve passar o context para os outros componentes", () => {
    let value: ToDoContextProps | null;
    const OtherComponent = () => {
      const context = React.useContext<ToDoContextProps>(ToDoContext);
      value = context;
      return null;
    };
    render(
      <ToDoContextProvider>
        <OtherComponent />
      </ToDoContextProvider>
    );
    expect(value!).toBeDefined();
    expect(value!.taskListState).toBeDefined();
    expect(value!.setTaskListState).toBeDefined();
  });

  it("Deve mudar o useState do context corretamente", () => {
    const OtherComponent = () => {
      const { taskListState, setTaskListState } = React.useContext<ToDoContextProps>(ToDoContext);
      React.useEffect(() => {
        setTaskListState([
          { id: "01", description: "Task 01", isDone: true }, { id: "02", description: "Task 02", isDone: false }]);
      }, []);
      return (
        <>
          {taskListState.map((task) => (
            <article key={task.id}>{task.description}</article>
          ))}
        </>
      );
    };
    render(
      <ToDoContextProvider>
        <OtherComponent />
      </ToDoContextProvider>
    );
    const task01 = screen.getByText(/Task 01/i);
    const task02 = screen.getByText(/Task 02/i);
    expect(task01).toBeDefined();
    expect(task02).toBeDefined();
  });
})