import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

function Todolist(props: PropsType) {

    const [title, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addNewTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setNewTitle('')
        } else {
            setError('Your are wrong, stupid!')
        }
    }

        const changeAll = () => props.changeFilter('all')
        const changeActive = () => props.changeFilter('active')
        const changeCompleted = () => props.changeFilter('completed')

        const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value)
        }

        const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                       className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTask = () => {
                            props.removeTask(t.id)
                        }
                        const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return <li key={t.id} className={t.isDone === true ? 'isDone' : ''}><input type="checkbox"
                                                     checked={t.isDone}
                                                     onChange={statusHandler}
                        />
                            <span>{t.title}</span>
                            <button onClick={onRemoveTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={changeAll} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
                <button onClick={changeActive} className={props.filter === 'active' ? 'activeFilter' : ''}>Active</button>
                <button onClick={changeCompleted} className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed</button>
            </div>
        </div>
    }

export default Todolist