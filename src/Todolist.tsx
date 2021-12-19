import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

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
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Field is require')
        }
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onClickEnter}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}
            >+
            </button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)
                    const changeCheck = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeCheck}/>
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={changeOnAll} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
            <button onClick={changeOnActive} className={props.filter === 'active' ? 'activeFilter' : ''}>Active</button>
            <button onClick={changeOnCompleted} className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed</button>
        </div>
    </div>
}

export default Todolist
