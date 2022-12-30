import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch } from '../../app/hooks'
import { editColumn } from '../../Slices/TodoListSlice'
import { useState } from 'react'
import { IColumn } from '../../interfaces'
import styles from './styles.module.scss'

function ModalAddTodo(props: IColumn) {
    const dispatch = useAppDispatch()
    const [todoTitle, setTodoTitle] = useState('')
    const [todoText, setTodoText] = useState('')
    const dateOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    return (
        <Modal show={props.addTodoStatus}>
            <Modal.Header>
                <Modal.Title>Add New Todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={styles['modal__content']}>
                    <div className={styles['modal__text']}>
                        Input Todo Title
                    </div>
                    <input
                        type="text"
                        onChange={(e) => {
                            setTodoTitle(e.currentTarget.value)
                        }}
                        value={todoTitle}
                    />
                </div>

                <div className={styles['modal__content']}>
                    <div className={styles['modal__text']}>Input Todo Text</div>
                    <textarea
                        className={styles['modal__text']}
                        onChange={(e) => setTodoText(e.currentTarget.value)}
                        value={todoText}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        dispatch(
                            editColumn({
                                ...props,
                                addTodoStatus: !props.addTodoStatus,
                            })
                        )
                        setTodoTitle('')
                        setTodoText('')
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        todoTitle.length > 0 &&
                            dispatch(
                                editColumn({
                                    ...props,
                                    cards: [
                                        ...props.cards,
                                        {
                                            title: todoTitle,
                                            text: todoText,
                                            deleteStatus: false,
                                            editStatus: false,
                                            status: 'todo',
                                            cardID: Date.now().toString(),
                                            complete: false,
                                            date: new Date().toLocaleDateString(
                                                'ru-RU',
                                                dateOptions
                                            ),
                                            comments: [],
                                            changeDate: '',
                                        },
                                    ],
                                    addTodoStatus: !props.addTodoStatus,
                                })
                            ) &&
                            setTodoText('')
                        setTodoTitle('')

                        todoTitle.length === 0 && alert('Введите имя задачи')
                    }}
                >
                    Add Todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddTodo
