import {FilterType, TodoType} from "../App";
import {v1} from "uuid";

export type RemoveTodoType = {
    type: 'REMOVE-TODO'
    id: string
}

export type AddTodoType = {
    type: 'ADD-TODO'
    title: string
    todolistId: string
}

export type ChangeTodoFilterType = {
    type: 'CHANGE-FILTER'
    id: string
    filter: FilterType
}

export type ChangeTodoTitleType = {
    type: 'CHANGE-TODO-TITLE'
    id: string
    title: string
}

type ActionType = RemoveTodoType | AddTodoType | ChangeTodoFilterType | ChangeTodoTitleType

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodoType> = []

export const todolistsReducer = (state: Array<TodoType> = initialState, action: ActionType): Array<TodoType> => {
    switch (action.type) {
        case 'REMOVE-TODO': {
            return state.filter(td => td.id !== action.id)
        }
        case 'ADD-TODO': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODO-TITLE': {
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-FILTER': {
            const todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodoAC = (todolistId: string): RemoveTodoType => {
    return {type: "REMOVE-TODO", id: todolistId}
}

export const addTodoAC = (title: string): AddTodoType => {
    return {type: "ADD-TODO", title, todolistId: v1()}
}

export const changeTodoTitleAC = (id: string, title: string): ChangeTodoTitleType => {
    return {type: "CHANGE-TODO-TITLE", id, title}
}

export const changeTodoFilterAC = (id: string, filter: FilterType): ChangeTodoFilterType => {
    return {type: "CHANGE-FILTER", id, filter}
}