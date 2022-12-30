import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ICard, IColumn } from '../../interfaces'
import store from '../../app/store'
import {
    setDragCard,
    setDragColumn,
    setDragPosition,
    setDragIndex,
    setEditTodoStatus,
    setDeleteTodoStatus,
    deleteTodo,
} from '../../Slices/TodoListSlice'
import styles from './styles.module.scss'
import ModalEdit from '../ModalEdit/ModalEdit'
import ModalDelete from '../ModalDelete/ModalDelete'

function TodoCard(props: { card: ICard; column: IColumn }) {
    const dispatch = useAppDispatch()
    const data = useAppSelector(store.getState).todoList
    const cardIndex = props.column.cards.indexOf(props.card)
    const cardClassName = classNames(styles[`todo__card`], {
        [styles['top']]:
            data.dragPosition === 'top' &&
            data.dragItemIndex === cardIndex &&
            props.column.columnID === data.dragEndColumn.columnID &&
            data.dragCard !== props.card,

        [styles['bot']]:
            data.dragPosition === 'bot' &&
            data.dragItemIndex === cardIndex &&
            props.column.columnID === data.dragEndColumn.columnID &&
            data.dragCard !== props.card,
    })

    function setEditStatus() {
        dispatch(setEditTodoStatus({ ...props }))
    }
    function setDeleteStatus() {
        dispatch(setDeleteTodoStatus({ ...props }))
    }
    function dragStartHandler() {
        dispatch(setDragCard(props.card))
        dispatch(setDragColumn(props.column))
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const { y, height } = e.currentTarget.getBoundingClientRect()
        if (e.clientY > y && e.clientY < y + height / 2) {
            return (
                dispatch(setDragPosition('top')),
                dispatch(setDragIndex(cardIndex))
            )
        }

        if (e.clientY > y + height / 2 && e.clientY < y + height) {
            return (
                dispatch(setDragPosition('bot')),
                dispatch(setDragIndex(cardIndex))
            )
        }
    }

    function dragEndHandler() {
        dispatch(setDragPosition(''))
    }

    return (
        <>
            <ModalDelete
                title={`Delete task`}
                text={
                    <>
                        Delete <b>{props.card.title}</b>?
                    </>
                }
                deleteStatus={props.card.deleteStatus}
                saveChanges={() => {
                    setDeleteStatus()
                    dispatch(deleteTodo({ ...props }))
                }}
                discardChanges={() => {
                    setDeleteStatus()
                    setEditStatus()
                }}
            />

            <ModalEdit card={props.card} column={props.column} />

            <div
                className={cardClassName}
                key={props.card.cardID}
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                onDragOver={dragOverHandler}
                onClick={setEditStatus}
                draggable={true}
            >
                <div className={styles['todo__card_header']}>
                    <div className={styles['todo__card_title']}>
                        {props.card.title}
                    </div>
                </div>

                <div className={styles['todo__card_text']}>
                    {props.card.text}
                </div>
                <div className={styles['todo__card_comment']}>
                    {`Comments(${props.card.comments.length})`}
                </div>
                <div className={styles['todo__card_create']}>
                    Created: {props.card.date}
                </div>
                {props.card.changeDate !== '' && (
                    <div className={styles['todo__card_create']}>
                        Last update: {props.card.changeDate}
                    </div>
                )}
            </div>
        </>
    )
}

export default TodoCard
