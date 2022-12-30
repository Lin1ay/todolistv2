export interface ITodoList {
    name: string
    changeName: boolean
    lists: IColumn[]
    dragCard: ICard
    dragColumn: IColumn
    dragEndColumn: IColumn
    dragStatus: string
    dragPosition: string
    dragItemIndex: number
    modalStatus: boolean
    modalProjectNameStatus: boolean
    modalEditStatus: boolean
}

export interface ICard {
    title: string
    text: string
    status: string
    date: string
    changeDate: string
    cardID: string
    complete: boolean
    comments: IComment[]
    deleteStatus: boolean
    editStatus: boolean
}

export interface IColumn {
    name: string
    columnID: string
    addTodoStatus: boolean
    cards: ICard[]
}

export interface IComment {
    text: string
    createDate: string
    commentID: string
}

export interface IModalChange {
    title: string
    text: string | React.ReactNode
    deleteStatus: boolean
    saveChanges: () => void
    discardChanges: () => void
}
export interface IChangeTodo {
    column: IColumn
    card: ICard
}
