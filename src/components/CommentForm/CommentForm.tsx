import { useState } from 'react'
import styles from './styles.module.scss'
import { ICard, IColumn } from '../../interfaces'
import { useAppDispatch } from '../../app/hooks'
import { changeTodo } from '../../Slices/TodoListSlice'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
    card: ICard
    column: IColumn
}

function AddCommentForm(props: IProps) {
    const [newCommentText, setNewCommentText] = useState('')
    const dispatch = useAppDispatch()
    const dateOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    function addNewComment() {
        dispatch(
            changeTodo({
                ...props,
                card: {
                    ...props.card,
                    comments: [
                        ...props.card.comments,
                        {
                            commentID: uuidv4(),
                            text: newCommentText,
                            createDate: new Date().toLocaleDateString(
                                'ru-RU',
                                dateOptions
                            ),
                        },
                    ],
                    changeDate: new Date().toLocaleDateString(
                        'ru-RU',
                        dateOptions
                    ),
                },
            })
        )
    }
    function addComment(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        addNewComment()
        setNewCommentText('')
    }
    return (
        <div className={styles['comment__form-container']}>
            <div className={styles['comment__form-title']}>
                Input comment text
            </div>
            <textarea
                className={styles['comment__form-input']}
                value={newCommentText}
                onChange={(e) => {
                    setNewCommentText(e.currentTarget.value)
                }}
            />
            {newCommentText.length > 0 && (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={addComment}
                >
                    Add Comment
                </button>
            )}
        </div>
    )
}

export default AddCommentForm
