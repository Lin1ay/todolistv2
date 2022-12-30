import { IColumn, IComment, ICard } from '../../interfaces'
import styles from './styles.module.scss'
import { useAppDispatch } from '../../app/hooks'
import { changeTodo } from '../../Slices/TodoListSlice'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface IProps {
    card: ICard
    column: IColumn
    comment: IComment
}

function Comment(props: IProps) {
    const dispatch = useAppDispatch()
    const [comment, setComment] = useState(props.comment.text)
    const [commentStatus, setCommentStatus] = useState(false)
    const dateOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    function changeCommentStatus() {
        setCommentStatus(!commentStatus)
    }
    function deleteComment() {
        dispatch(
            changeTodo({
                ...props,
                card: {
                    ...props.card,
                    comments: props.card.comments.filter(
                        (comment) =>
                            comment.commentID !== props.comment.commentID
                    ),
                },
            })
        )
    }
    function addNewComment() {
        dispatch(
            changeTodo({
                ...props,
                card: {
                    ...props.card,
                    comments: props.card.comments.map((thisComment) => {
                        if (thisComment.commentID === props.comment.commentID) {
                            thisComment = {
                                commentID: uuidv4(),
                                text: comment,
                                createDate: new Date().toLocaleDateString(
                                    'ru-RU',
                                    dateOptions
                                ),
                            }
                            return thisComment
                        }
                        return thisComment
                    }),
                },
            })
        )
        changeCommentStatus()
    }
    function addComment() {
        addNewComment()
        setComment('')
    }
    return (
        <div key={props.comment.commentID} className={styles['comment']}>
            <div className={styles['comment__text']}>
                {commentStatus ? (
                    <textarea
                        value={comment}
                        autoFocus
                        onChange={(e) => {
                            setComment(e.currentTarget.value)
                        }}
                        onBlur={addComment}
                    />
                ) : (
                    <div onClick={changeCommentStatus}>{comment}</div>
                )}
            </div>

            <div className={styles['comment__link']} onClick={deleteComment}>
                delete
            </div>

            <div className={styles['date__string']}>
                {props.comment.createDate}
            </div>
        </div>
    )
}

export default Comment
