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
    useEffect(() => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        todoAPI.getTasks(todolistId, 'New task')
            .then((res) => {
                setState(res.data)
            })
    }, [])

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
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>
    </div>
}



