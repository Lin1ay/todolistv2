import styles from './styles.module.scss'

export interface IProps {
    saveChanges: () => void
    discardChanges: () => void
}

function ButtonsGroup(props: IProps) {
    return (
        <div className={styles['modal__buttons-group']}>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={props.discardChanges}
            >
                Cancel
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.saveChanges}
            >
                Save
            </button>
        </div>
    )
}

export default ButtonsGroup
