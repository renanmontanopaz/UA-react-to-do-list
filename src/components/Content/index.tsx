import styles from './index.module.css';
import Plus from '../../assets/plus.svg';
import { NoContent } from '../NoContent';
import { ChangeEvent, useState } from 'react';
import { TodoList } from '../TodoList';
import { Task } from '../../models/Task';
import { v4 as uuidv4 } from 'uuid';


export const Content = () => {
    // Variavéis de estado no react
    // const [nomeState, setNomeState] = useState<string>("Cesar");

    const [description, setDescription] = useState<string>("");

    const [tasksList, setTasksList] = useState<Task[]>([
        {
            id: "1",
            description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi recusandae quas repellat culpa amet incidunt necessitatibus odit aspernatur modi? Doloribus vel error earum debitis exercitationem libero facilis eligendi magnam repellendus!`,
            isDone: false
        },
        {
            id: "2",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quod repellat aperiam. Quia, odio? Praesentium error voluptate delectus ipsa est sed. Necessitatibus, quibusdam! Sit dolorem provident obcaecati ex ullam est.`,
            isDone: false
        },
        {
            id: "3",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, maiores laboriosam praesentium nihil autem nemo quam ullam laborum fugiat sapiente soluta dolor accusamus minima voluptatum laudantium, ipsum explicabo id accusantium?`,
            isDone: true
        },

    ]);

    const addTaskOnList = () => {

        const newTask = {
            id: uuidv4(),
            description,
            isDone: false,
        }

        setTasksList((currentValue) => [...currentValue, newTask]);
    }

    const removeTaskOnList = (id: string) => {
        setTasksList((currentValue) => currentValue.filter(task => task.id !== id))
    }

    return (
        <section className={styles.section_container}>
            <main>

                <article className={styles.input_container}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />
                    <button className={styles.button} onClick={() => addTaskOnList()} >
                        Criar
                        <img
                            src={Plus}
                            alt="Ícone de mais" />
                    </button>
                </article>

                <article className={styles.content_header}>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_created}>Tarefas Criadas</p>
                        <span className={styles.span_value} >0</span>
                    </article>
                    <article className={styles.tasks_container}>
                        <p className={styles.tasks_done}>Concluídas</p>
                        <span className={styles.span_value}>0</span>
                    </article>
                </article>

                {tasksList.length === 0 ? <NoContent /> : <TodoList onDelete={removeTaskOnList} list={tasksList} />}

            </main>
        </section>
    )
}