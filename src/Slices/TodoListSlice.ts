import { IChangeTodo, ITodoList } from './../interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICard, IColumn } from './../interfaces'

const initialState: ITodoList = {
    name: '',
    changeName: true,
    modalProjectNameStatus: false,
    modalStatus: false,
    modalEditStatus: false,

    lists: [
        {
            name: 'To do',
            columnID: 'todo',
            addTodoStatus: false,
            cards: [],
        },
        {
            name: 'In progress',
            columnID: 'inprogress',
            addTodoStatus: false,
            cards: [],
        },
        { name: 'Done', columnID: 'done', addTodoStatus: false, cards: [] },
    ],

    dragCard: {
        title: '',
        cardID: '',
        deleteStatus: false,
        editStatus: false,
        complete: false,
        date: '',
        changeDate: '',
        text: '',
        status: '',
        comments: [],
    },

    dragColumn: {
        name: '',
        columnID: '',
        addTodoStatus: false,
        cards: [],
    },

    dragStatus: '',
    dragItemIndex: 0,
    dragPosition: '',
    dragEndColumn: {
        name: '',
        columnID: '',
        addTodoStatus: false,
        cards: [],
    },
}
const TodoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ICard>) => {
            state.lists[0].cards = state.lists[0].cards.concat(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards = column.cards.filter(
                        (card) => card.cardID !== action.payload.card.cardID
                    )
                    return column
                }
                return column
            })
        },
        changeTodo: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards.map((card) => {
                        if (card.cardID === action.payload.card.cardID) {
                            card.comments = action.payload.card.comments
                            return card
                        }
                        return card
                    })
                    return column
                }
                return column
            })
        },
        setEditTodoStatus: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards.map((card) => {
                        if (card.cardID === action.payload.card.cardID) {
                            card.editStatus = !action.payload.card.editStatus
                            return card
                        }
                        return card
                    })
                    return column
                }
                return column
            })
        },

        setDeleteTodoStatus: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards.map((card) => {
                        if (card.cardID === action.payload.card.cardID) {
                            card.deleteStatus =
                                !action.payload.card.deleteStatus
                            return card
                        }
                        return card
                    })
                    return column
                }
                return column
            })
        },
        setTodoTitle: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards.map((card) => {
                        if (card.cardID === action.payload.card.cardID) {
                            card.title = action.payload.card.title
                            card.changeDate = action.payload.card.changeDate
                            return card
                        }
                        return card
                    })
                    return column
                }
                return column
            })
        },
        setTodoText: (state, action: PayloadAction<IChangeTodo>) => {
            state.lists = state.lists.map((column) => {
                if (column.columnID === action.payload.column.columnID) {
                    column.cards.map((card) => {
                        if (card.cardID === action.payload.card.cardID) {
                            card.text = action.payload.card.text
                            card.changeDate = action.payload.card.changeDate
                            return card
                        }
                        return card
                    })
                    return column
                }
                return column
            })
        },
        editColumn: (state, action: PayloadAction<IColumn>) => {
            state.lists = state.lists.map((item) => {
                if (item.columnID === action.payload.columnID) {
                    return (item = action.payload)
                }
                return item
            })
        },
        setChangeNameStatus: (state) => {
            state.changeName = !state.changeName
        },
        setDragCard: (state, action: PayloadAction<ICard>) => {
            state.dragCard = action.payload
        },
        setDragColumn: (state, action: PayloadAction<IColumn>) => {
            state.dragColumn = action.payload
        },
        setEndDragColumn: (state, action: PayloadAction<IColumn>) => {
            state.dragEndColumn = action.payload
        },
        setDragStatus: (state, action: PayloadAction<string>) => {
            state.dragStatus = action.payload
        },
        setDragIndex: (state, action: PayloadAction<number>) => {
            state.dragItemIndex = action.payload
        },
        setDragPosition: (state, action: PayloadAction<string>) => {
            state.dragPosition = action.payload
        },
        setProjectName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
    },
})

export const {
    addTodo,
    deleteTodo,
    changeTodo,
    setEditTodoStatus,
    setDeleteTodoStatus,
    setTodoTitle,
    setTodoText,
    editColumn,
    setChangeNameStatus,
    setDragCard,
    setDragColumn,
    setDragStatus,
    setDragIndex,
    setDragPosition,
    setEndDragColumn,
    setProjectName,
} = TodoListSlice.actions
export default TodoListSlice.reducer
