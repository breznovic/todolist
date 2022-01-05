import React from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    demTask: (id: string) => void
    chooseTaskStatus: (value: FilterType) => void
}

export function Todolist(props: PropsType) {

    const chooseActive = () => props.chooseTaskStatus('active')
    const chooseAll = () => props.chooseTaskStatus('all')
    const chooseComplete = () => props.chooseTaskStatus('completed')

    return (
    <div>
        <h3>{props.title}</h3>
            {
                props.tasks.map(t => {
                    const demolTask = () => props.demTask(t.id)
                    return <div key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={demolTask}>x</button>
                    </div>
                })
            }
            <button onClick={chooseAll}>All</button>
            <button onClick={chooseActive}>Active</button>
            <button onClick={chooseComplete}>Completed</button>
        </div>
    )}