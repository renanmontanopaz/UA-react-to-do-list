import Trash from '../../assets/trash.svg';
import useToDoContext from '../../hooks/useToDoContext';
import styles from './index.module.css';

interface TodoListProps {
    onDelete: (id: string) => void;
    onChangeCheckbox: (id: string) => void;
}

export const TodoList = ({ onDelete, onChangeCheckbox }: TodoListProps) => {
    const { taskListState } = useToDoContext()

    return (
        <section className={styles.section_container}>
            {taskListState.map((task) => (
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