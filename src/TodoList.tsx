import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (todolistId: string) => void
}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onAllChangeFilter = () => props.changeFilter('all', props.id)
    const onActiveChangeFilter = () => props.changeFilter('active', props.id)
    const onCompletedChangeFilter = () => props.changeFilter('completed', props.id)

    const addNewTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Type your message')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    const removeTodolist = () => {
props.removeTodolist(props.id)
    }

    return <div>
        <h3>{props.title}
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addNewTask}>+</button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveTask = () => props.removeTask(t.id, props.id)
                    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}><input type="checkbox"
                                                                                      onChange={onCheckHandler}
                                                                                      checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTask}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllChangeFilter}>All</button>
            <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveChangeFilter}>Active
            </button>
            <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={onCompletedChangeFilter}>Completed
            </button>
        </div>
    </div>
}

export default TodoList