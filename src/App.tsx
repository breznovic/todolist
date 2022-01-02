import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TaskStateType = {
[key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    return <div className='app'>

    </div>
}

export default App