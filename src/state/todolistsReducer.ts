import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterType
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case'REMOVE_TODOLIST': {
            return state.filter(td => td.id !== action.id)
        }
        case'ADD_TODOLIST': {
            return [{
                id: v1(),
                title: action.title,
                filter: 'all'
            },
                ...state]
        }
        case'CHANGE_TODOLIST_TITLE': {
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
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

export const RemoveTodolist = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE_TODOLIST", id: todolistId}
}

export const AddTodolist = (title: string): AddTodolistActionType => {
    return {type: "ADD_TODOLIST", title: title}
}

export const ChangeTodolistTitle = (id: string, title: string,): ChangeTodolistTitleActionType => {
    return {type: "CHANGE_TODOLIST_TITLE", id: id, title: title}
}

export const ChangeTodolistFilter = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", id: id, filter: filter}
}