import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";

test('correct task should be removed', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', status: TaskStatuses},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', status: TaskStatuses},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', status: TaskStatuses},
        ]
    }

    const action = removeTaskAC('2', 'todolist2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', status: TaskStatuses},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', status: TaskStatuses},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', status: TaskStatuses},
        ]
    }

   const action = addTaskAC('juice', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('correct task status should be changed', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', status: TaskStatuses},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', status: TaskStatuses},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', status: TaskStatuses},
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBeFalsy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()
})

test('correct title of task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', status: TaskStatuses},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', status: TaskStatuses},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', status: TaskStatuses},
        ]
    }

    const action = changeTaskTitleAC('2', 'MilkyWay', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('Bread')
    expect(endState['todolistId2'][1].title).toBe('MilkyWay')
})
