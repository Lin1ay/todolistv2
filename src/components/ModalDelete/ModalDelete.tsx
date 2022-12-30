import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import styles from './styles.module.scss'
import { IModalChange } from '../../interfaces'

function ModalDelete(props: IModalChange) {
    return (
        <Modal show={props.deleteStatus}>
            <Modal.Header>
                <Modal.Title>
                    <p>{props.title}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={styles['modal__body']}>
                <p>{props.text}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        props.discardChanges()
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        props.saveChanges()
                    }}
                >
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete
