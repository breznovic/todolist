import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todoAPI} from "./todoAPI";

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "newTodolist"}, settings)
            .then( (res) => {
            setState(res.data);
        } )
    }, [])

    return <div>{JSON.stringify(state)} < /div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        todoAPI.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div>{JSON.stringify(state)} < /div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
        todoAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


