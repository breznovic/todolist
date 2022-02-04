import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string) => void
    filter: FilterType
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    
    const allTasks = () => props.changeFilter('all')
    const completedTasks = () => props.changeFilter('completed')
    const activeTasks = () => props.changeFilter('active')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const input = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const enterClick = (e: KeyboardEvent<HTMLInputElement>) => {if (e.charCode === 13){addTask()}}


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={input}
                   onKeyPress={enterClick}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const deleteTask = () => props.deleteTask(t.id)
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span> {t.title}</span>
                        <button onClick={deleteTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={allTasks}>All</button>
            <button onClick={activeTasks}>Active</button>
            <button onClick={completedTasks}>Completed</button>
        </div>
    </div>
}

export default Todolist
