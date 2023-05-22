import styles from './index.module.css';
import Plus from '../../assets/plus.svg';
import { NoContent } from '../NoContent';
import { ChangeEvent, useEffect, useState } from 'react';
import { TodoList } from '../TodoList';
import { Task } from '../../models/Task';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../configs/api';
import useToDoContext from '../../hooks/useToDoContext';
import { useToast } from '../../hooks/useToast';

export const Content = () => {
    const [description, setDescription] = useState<string>("");

    const { taskListState, setTaskListState } = useToDoContext()
    const { showToast } = useToast();

    const tasksDone = taskListState.filter((task) => {
        return task.isDone !== false;
    })

    const disabledButton = !description.length;

    const addTaskOnList = () => {

        const newTask = {
            id: uuidv4(),
            description,
            isDone: false,
        }
        api.post("tasks", newTask)
            .then((response) => setTaskListState((currentValue) => [...currentValue, response.data]))
            .finally(() => {
                setDescription('')
                showToast({
                    message: "Tarefa adicionada com sucesso",
                    type: 'success'
                })
            });
    }

    const removeTaskOnList = (id: string) => {
        api.delete(`tasks/${id}`)
            .then(() =>
                setTaskListState((currentValue) => currentValue.filter(task => task.id !== id)));
    }

    const changeStatusCheckbox = (id: string) => {
        const task = taskListState.find(task => task.id === id);

        if (task) {
            api.patch(`tasks/${id}`, {
                isDone: !task.isDone,
            });
        }

        const xebas = taskListState.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    isDone: !task.isDone
                }
            }
            return task;
        });

        setTaskListState(xebas);
    }

    useEffect(() => {
        api.get("tasks").then((response) => setTaskListState(response.data as Task[]));
    }, []);

    return (
        <section className={styles.section_container}>
            <main>

                <article className={styles.input_container}>
                    <input
                        className={styles.input}
                        type="text"
                        value={description}
                        placeholder="Adicione uma nova tarefa"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />
                    <button
                        className={styles.button}
                        disabled={disabledButton}
                        onClick={() => addTaskOnList()} >
                        Criar
                        <img
                            src={Plus}
                            alt="Ícone de mais" />
                    </button>
                </article>

                <article className={styles.content_header}>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_created}>Tarefas Criadas</p>
                        <span className={styles.span_value}>{taskListState.length}</span>
                    </article>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_done}>Concluídas</p>
                        <span className={styles.span_value}> {tasksDone.length} de {taskListState.length} </span>
                    </article>
                </article>

                {taskListState.length === 0 ? <NoContent /> : <TodoList
                    onDelete={removeTaskOnList}
                    onChangeCheckbox={changeStatusCheckbox}
                />}


            </main>
        </section>
    )
}