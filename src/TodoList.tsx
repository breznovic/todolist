import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import {FilterType} from "./App"
import classes from './App.module.css'

type TasksType = {
    id: string
    isDone: boolean
    title: string
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
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

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? classes.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={classes.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? classes.isDone : ''}>
                        <input type='checkbox'
                               onChange={onChangeHandler}
                               checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}
        </ul>
        <div>
            <button className={props.filter === "all" ? classes.activeFilter : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? classes.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? classes.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

export default TodoList