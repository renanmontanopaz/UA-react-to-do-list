import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Plus from "../../assets/plus.svg";
import useToDoContext from "../../hooks/useToDoContext";
import { useToast } from "../../hooks/useToast";
import {
  changeIsDone,
  createTask,
  deleteTask,
  getTasks,
} from "../../services/task";
import { NoContent } from "../NoContent";
import { TodoList } from "../TodoList";
import styles from "./index.module.css";

export const Content = () => {
  const [description, setDescription] = useState<string>("");

  const { taskListState, setTaskListState } = useToDoContext();
  const { showToast } = useToast();

  const tasksDone = taskListState.filter((task) => {
    return task.isDone !== false;
  });

  const disabledButton = !description.length;

  const addTaskOnList = () => {
    const newTask = {
      id: uuidv4(),
      description,
      isDone: false,
    };

    createTask(newTask)
      .then((response) =>
        setTaskListState((currentValue) => [...currentValue, response])
      )
      .finally(() => {
        setDescription("");
        showToast({
          message: "Tarefa adicionada com sucesso",
          type: "success",
        });
      });
  };

  const removeTaskOnList = (id: string) => {
    deleteTask(id).then(() =>
      setTaskListState((currentValue) =>
        currentValue.filter((task) => task.id !== id)
      )
    );
  };

  const changeStatusCheckbox = (id: string) => {
    const task = taskListState.find((task) => task.id === id);

    if (task) {
      changeIsDone(id, {
        isDone: !task.isDone,
      });
    }

    const xebas = taskListState.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isDone: !task.isDone,
        };
      }
      return task;
    });

    setTaskListState(xebas);
  };

  useEffect(() => {
    getTasks().then((response) => setTaskListState(response));
  }, [setTaskListState]);

  return (
    <section className={styles.section_container}>
      <main>
        <article className={styles.input_container}>
          <input
            className={styles.input}
            type="text"
            value={description}
            placeholder="Adicione uma nova tarefa"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
          />
          <button
            className={styles.button}
            disabled={disabledButton}
            onClick={() => addTaskOnList()}
          >
            Criar
            <img src={Plus} alt="Ícone de mais" />
          </button>
        </article>

        <article className={styles.content_header}>
          <article className={styles.tasks_container}>
            <p className={styles.tasks_created}>Tarefas Criadas</p>
            <span className={styles.span_value}>{taskListState.length}</span>
          </article>
          <article className={styles.tasks_container}>
            <p className={styles.tasks_done}>Concluídas</p>
            <span className={styles.span_value}>
              {" "}
              {tasksDone.length} de {taskListState.length}{" "}
            </span>
          </article>
        </article>

        {taskListState.length === 0 ? (
          <NoContent />
        ) : (
          <TodoList
            onDelete={removeTaskOnList}
            onChangeCheckbox={changeStatusCheckbox}
          />
        )}
      </main>
    </section>
  );
};
