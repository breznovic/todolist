import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}

export type RemoveTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | RemoveTodolistFilterActionType

export const todoReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error('Unknown action type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', newTitle: newTitle, id: id}
}

export const RemoveTodolistFilterAC = (filter: FilterType, id: string): RemoveTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
