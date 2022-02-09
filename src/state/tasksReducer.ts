import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    title: string
    todolistId: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD_TASK': {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks
            return copyState
        }
        case 'CHANGE_TASK_STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }
        case 'CHANGE_TASK_TITLE': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return ({...state})
        }
        case'ADD_TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", todolistId, taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todolistId}
}