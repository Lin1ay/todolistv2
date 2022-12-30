import { ICard, IColumn } from '../../interfaces'
import Comment from '../Comment/Comment'
import styles from './styles.module.scss'

interface IProps {
    card: ICard
    column: IColumn
}

function CommentSection(props: IProps) {
    return (
        <div className={styles['comments__container']}>
            {props.card.comments.length > 0 && (
                <div className={styles['comments__title']}>Comments:</div>
            )}
            <div className={styles['comment__section']}>
                {props.card.comments.map((comment) => (
                    <div key={comment.commentID}>
                        <Comment
                            card={props.card}
                            column={props.column}
                            comment={comment}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentSection
