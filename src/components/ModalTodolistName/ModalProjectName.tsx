import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setProjectName, setChangeNameStatus } from '../../Slices/TodoListSlice'
import { useState } from 'react'
import styles from './styles.module.scss'
import store from '../../app/store'

function ModalProjectName() {
    const dispatch = useAppDispatch()
    const data = useAppSelector(store.getState).todoList
    const [todoListTitle, setTodoListTitle] = useState('')
    function modalСlose(e: any) {
        e.key === 'Enter' &&
            todoListTitle.length === 0 &&
            alert('Введите имя проекта')
        e.key === 'Enter' &&
            todoListTitle.length > 0 &&
            dispatch(setProjectName(todoListTitle)) &&
            dispatch(setChangeNameStatus())
    }
    return (
        <Modal show={data.changeName}>
            <Modal.Header>
                <Modal.Title>Project Name</Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles['modal__body']}>
                <div className={styles['input__name']}>
                    Input Project Name here.
                </div>
                <input
                    className={styles['input__name']}
                    type="text"
                    autoFocus
                    value={todoListTitle}
                    onChange={(e) => {
                        setTodoListTitle(e.currentTarget.value)
                    }}
                    onKeyDown={(e) => {
                        modalСlose(e)
                    }}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        todoListTitle.length === 0 &&
                            alert('Введите имя проекта')

                        todoListTitle.length > 0 &&
                            dispatch(setProjectName(todoListTitle)) &&
                            dispatch(setChangeNameStatus())
                    }}
                >
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProjectName
