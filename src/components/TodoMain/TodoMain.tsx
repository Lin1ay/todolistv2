import { useAppSelector } from '../../app/hooks'
import store from '../../app/store'
import TodoColumn from '../TodoColumn/TodoColumn'
import styles from './styles.module.scss'

function TodoMain() {
    const data = useAppSelector(store.getState).todoList

    return (
        <div className={styles['main__frame']}>
            {data.lists.map((item) => (
                <TodoColumn
                    key={item.columnID}
                    name={item.name}
                    columnID={item.columnID}
                    addTodoStatus={item.addTodoStatus}
                    cards={item.cards}
                />
            ))}
        </div>
    )
}

export default TodoMain
