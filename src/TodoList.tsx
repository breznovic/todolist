import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react'
import './App.css'
import {FilterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is require')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = ((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    })

    const allHandler = () => props.changeFilter('all')
    const activeHandler = () => props.changeFilter('active')
    const completedHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className='errorMessage'>Field is require</div>}
        </div>
        <ul>{
            props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id)
                const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked)
                }
                return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input type="checkbox"
                           onChange={checkHandler}
                           checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>x
                    </button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === "all" ? 'activeFilter' : ''}
                    onClick={allHandler}>All
            </button>
            <button className={props.filter === "active" ? 'activeFilter' : ''}
                    onClick={activeHandler}>Active
            </button>
            <button className={props.filter === "completed" ? 'activeFilter' : ''}
                    onClick={completedHandler}>Completed
            </button>
        </div>
    </div>
}

export default TodoList