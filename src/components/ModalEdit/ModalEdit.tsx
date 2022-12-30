import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch } from '../../app/hooks'
import {
    setEditTodoStatus,
    setDeleteTodoStatus,
    setTodoTitle,
    setTodoText,
} from '../../Slices/TodoListSlice'
import { useState } from 'react'
import { ICard, IColumn } from '../../interfaces'
import styles from './styles.module.scss'
import AddCommentForm from '../CommentForm/CommentForm'
import CommentSection from '../CommentsSection/CommentSection'
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup'

interface IProps {
    card: ICard
    column: IColumn
}

function ModalEdit(props: IProps) {
    const dispatch = useAppDispatch()
    const [formTitleActive, setFormTitleActive] = useState(false)
    const [newTitle, setNewTitle] = useState(props.card.title)
    const [newText, setNewText] = useState(props.card.text)

    const dateOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    function setEditStatus() {
        dispatch(setEditTodoStatus({ ...props }))
    }

    function setDeleteStatus() {
        dispatch(setDeleteTodoStatus({ ...props }))
    }

    function deleteTodoButton() {
        setDeleteStatus()
        setEditStatus()
    }
    function editCardTitle() {
        dispatch(
            setTodoTitle({
                ...props,
                card: {
                    ...props.card,
                    title: newTitle,
                    changeDate: new Date().toLocaleDateString(
                        'ru-RU',
                        dateOptions
                    ),
                },
            })
        )
    }
    function editCardText() {
        dispatch(
            setTodoText({
                ...props,
                card: {
                    ...props.card,
                    text: newText,
                    changeDate: new Date().toLocaleDateString(
                        'ru-RU',
                        dateOptions
                    ),
                },
            })
        )
    }

    return (
        <Modal show={props.card.editStatus} onHide={setEditStatus}>
            <Modal.Header>
                <Modal.Title className={styles['modal__input']}>
                    {formTitleActive ? (
                        <div className={styles['modal__input']}>
                            <input
                                className={styles['modal__input']}
                                type="text"
                                autoFocus
                                value={newTitle}
                                onChange={(e) => {
                                    setNewTitle(e.currentTarget.value)
                                }}
                            />
                            <div className={styles['modal__buttons-group']}>
                                <ButtonsGroup
                                    saveChanges={() => {
                                        editCardTitle()
                                        setFormTitleActive(!formTitleActive)
                                    }}
                                    discardChanges={() => {
                                        setFormTitleActive(!formTitleActive)
                                        setNewTitle(props.card.title)
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                setFormTitleActive(!formTitleActive)
                            }}
                        >
                            <b>{props.card.title}</b>
                        </div>
                    )}
                    <div className={styles['modal__date']}>
                        <b>Create date:</b> {props.card.date}
                    </div>
                    <div className={styles['modal__date']}>
                        {props.card.changeDate.length === 0 ? (
                            <>
                                <b>Last update:</b> no update
                            </>
                        ) : (
                            <>
                                <b>Last update:</b> {props.card.changeDate}
                            </>
                        )}
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <div className={styles['modal__title']}>
                        <b>Text:</b>
                    </div>
                    <div className={styles['modal__inner']}>
                        <textarea
                            className={styles['modal__input']}
                            value={newText}
                            onChange={(e) => {
                                setNewText(e.currentTarget.value)
                            }}
                        />
                        {newText !== props.card.text && (
                            <ButtonsGroup
                                saveChanges={editCardText}
                                discardChanges={() =>
                                    setNewText(props.card.text)
                                }
                            />
                        )}
                    </div>
                    <CommentSection card={props.card} column={props.column} />
                    <AddCommentForm card={props.card} column={props.column} />

                    {props.column.columnID !== 'done' && (
                        <Button
                            className={styles['modal__button']}
                            type="button"
                            variant="danger sm"
                            onClick={deleteTodoButton}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalEdit
