import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (TaskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const changeOnAll = () => {
        props.changeFilter('all')
    }
    const changeOnCompleted = () => {
        props.changeFilter('completed')
    }
    const changeOnActive = () => {
        props.changeFilter('active')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onClickEnter}
            />
            <button onClick={addTask}
            >+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={changeOnAll}>All</button>
            <button onClick={changeOnActive}>Active</button>
            <button onClick={changeOnCompleted}>Completed</button>
        </div>
    </div>
}

export default Todolist
