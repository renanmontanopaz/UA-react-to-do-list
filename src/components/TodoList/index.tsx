import Trash from '../../assets/trash.svg';
import { Task } from '../../models/Task';
import styles from './index.module.css';

interface TodoListProps {
    list: Task[];
    onDelete: (id: string) => void;
    onChangeCheckbox: (id: string) => void;
}

export const TodoList = ({ list, onDelete, onChangeCheckbox }: TodoListProps) => {
    return (
        <section className={styles.section_container}>
            {list.map((task) => (
                <article key={task.id}
                    className={styles.content_container}>
                    <input
                        type="checkbox"
                        id={task.id}
                        onChange={() => onChangeCheckbox(task.id)}
                        defaultChecked={task.isDone} />
                    <p className={task.isDone ? styles.text_scratched : styles.text}>{task.description}</p>
                    <img
                        className={styles.img}
                        src={Trash}
                        alt="Ícone de lixeira"
                        onClick={() => onDelete(task.id)} />
                </article>
            ))}
        </section>
    )
}