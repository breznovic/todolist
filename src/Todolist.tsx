import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

function Todolist(props: PropsType) {

    const [title, newTitle] = useState('')

    const changeAll = () => props.changeFilter('all')
    const changeActive = () => props.changeFilter('active')
    const changeCompleted = () => props.changeFilter('completed')
    const addNewTask = () => {
        props.addTask(title)
        newTitle('')
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        newTitle(e.currentTarget.value)
    }
    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={changeHandler}
                   onKeyPress={enterHandler}
            />
            <button onClick={addNewTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    
                    const onRemoveTask = () => {
                        props.removeTask(t.id)
                    }

                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onRemoveTask}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={changeAll}>All</button>
            <button onClick={changeActive}>Active</button>
            <button onClick={changeCompleted}>Completed</button>
        </div>
    </div>
}

export default Todolist