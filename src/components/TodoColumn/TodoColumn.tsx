import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { IColumn } from '../../interfaces'
import {
    editColumn,
    setEndDragColumn,
    setDragPosition,
} from '../../Slices/TodoListSlice'
import TodoCard from '../TodoCard/TodoCard'
import ModalAddTodo from '../ModalAddTodo/ModalAddTodo'
import React from 'react'

function TodoColumn(props: IColumn) {
    const dispatch = useAppDispatch()
    const data = useAppSelector(store.getState).todoList
    function sortPositionTop() {
        const firstArr = props.cards
            .slice(0, data.dragItemIndex)
            .filter((card) => card.cardID !== data.dragCard.cardID)
        const secondArr = props.cards
            .slice(data.dragItemIndex, props.cards.length + 1)
            .filter((card) => card.cardID !== data.dragCard.cardID)
        const newCards = [...firstArr, data.dragCard, ...secondArr]
        dispatch(
            editColumn({
                ...props,
                cards: newCards,
            })
        )
    }
    function sortPositionBot() {
        const firstArr = props.cards
            .slice(0, data.dragItemIndex + 1)
            .filter((card) => card.cardID !== data.dragCard.cardID)
        const secondArr = props.cards
            .slice(data.dragItemIndex + 1, props.cards.length + 1)
            .filter((card) => card.cardID !== data.dragCard.cardID)
        const newCards = [...firstArr, data.dragCard, ...secondArr]
        dispatch(
            editColumn({
                ...props,
                cards: newCards,
            })
        )
    }
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        dispatch(setEndDragColumn(props))
    }
    function dragDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        dispatch(setDragPosition(''))
        data.dragPosition === 'top' ? sortPositionTop() : sortPositionBot()
        data.dragColumn.columnID !== props.columnID &&
            dispatch(
                editColumn({
                    ...data.dragColumn,
                    cards: data.dragColumn.cards.filter(
                        (card) => card.cardID !== data.dragCard.cardID
                    ),
                })
            )
    }
    return (
        <>
            <div
                className={styles['todo__column_container']}
                onDragOver={dragOverHandler}
                onDrop={dragDropHandler}
            >
                {props.columnID === 'todo' ? (
                    <>
                        <ModalAddTodo
                            name={props.name}
                            columnID={props.columnID}
                            addTodoStatus={props.addTodoStatus}
                            cards={props.cards}
                        />
                        <div className={styles['todo__column_title']}>
                            {props.name}
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => {
                                    dispatch(
                                        editColumn({
                                            ...props,
                                            addTodoStatus: !props.addTodoStatus,
                                        })
                                    )
                                }}
                            >
                                Add todo
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles['todo__column_title']}>
                        {props.name}
                    </div>
                )}

                <div className={styles['todo__column_cards']}>
                    {props.cards.map((card) => (
                        <TodoCard
                            key={card.cardID}
                            card={card}
                            column={props}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default TodoColumn
