import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoType, RemoveTodoType} from "./todolistsReducer";

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}

type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type ActionType = RemoveTaskType |
    AddTaskType |
    ChangeTaskStatusType |
    ChangeTaskTitleType |
    AddTodoType |
    RemoveTodoType

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredtasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredtasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODO': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODO': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('Errror!')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone}
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskId, todolistId, title}
}