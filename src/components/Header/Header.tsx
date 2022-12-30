import styles from './styles.module.scss'
import { store } from '../../app/store'
import ModalProjectName from '../ModalTodolistName/ModalProjectName'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setProjectName } from '../../Slices/todoSlice'

function Header() {
    const data = useAppSelector(store.getState).todoList
    const [nameStatus, setNameStatus] = useState(false)
    const [name, setName] = useState(data.name)
    const dispatch = useAppDispatch()
    function modalСlose(e: any) {
        e.key === 'Enter' &&
            name.length === 0 &&
            alert('Введите название проекта')
        if (e.key === 'Enter' && name.length > 0) {
            dispatch(setProjectName(name))
            setNameStatus(!nameStatus)
            setName('')
        }
    }
    return (
        <div className={styles['header']}>
            <ModalProjectName />
            {nameStatus ? (
                <input
                    className={styles['header__input']}
                    value={name}
                    placeholder={'Введите новое название'}
                    autoFocus
                    onKeyDown={modalСlose}
                    onChange={(e) => {
                        setName(e.currentTarget.value)
                    }}
                    onBlur={(e) => {
                        e.stopPropagation()
                        if (name.length > 0) {
                            setNameStatus(!nameStatus)
                            dispatch(setProjectName(name))
                        }
                        if (name.length === 0) {
                            setNameStatus(!nameStatus)
                            dispatch(setProjectName(data.name))
                        }
                    }}
                />
            ) : (
                <div
                    className={styles['header__title']}
                    onClick={() => {
                        setNameStatus(!nameStatus)
                    }}
                >
                    {data.name}
                </div>
            )}
        </div>
    )
}

export default Header
