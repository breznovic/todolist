import React, {useEffect, useState} from 'react'
import {todoAPI} from "./todoAPI";

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cdd9f77-c60e-4af5-111-2222'
        todoAPI.getTodolists(todolistId, 'New')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)} </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoAPI.createTodolist('New todolist')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)} </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1cdd9f77-c60e-4af5-111-2222'
        todoAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)} </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        todoAPI.updateTodolist(todolistId, 'New title')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)} </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todoAPI.getTasks(todolistId, 'New title')
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)} </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        const taskId = '116e91e44-5933-4765-877a-bee86a7a2cc11'
        todoAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        todoAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={GetTasks}>Get tasks</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = () => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        todoAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: taskDescription,
            priority: priority,
            startDate: '',
            status: status,
            title: taskTitle
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'TodolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>type='number'
            <input placeholder={'TaskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>type='number'
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
            <input placeholder={'Description'} value={taskDescription} onChange={(e) => {setTaskDescription(e.currentTarget.value)}}/>
            <input placeholder={'Status'} value={status} type='number' onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'Priority'} value={priority} type='number' onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={'Start date'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <input placeholder={'Deadline'} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}




