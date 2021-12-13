import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
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

    const [newTitle, setNewTitle] = useState('')

    const onAllChange = () => props.changeFilter('all')
    const onCompleteChange = () => props.changeFilter('complete')
    const onActiveChange = () => props.changeFilter('active')

    const addTask = () => {
        {
            props.addTask(newTitle)
        }
        setNewTitle('')
    }

    const inputTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {addTask()}
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle}
                       onChange={() => inputTitle}
                       onKeyPress={() => onKeyPressTitle}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id)

                        return <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllChange}>All</button>
                <button onClick={onActiveChange}>Active</button>
                <button onClick={onCompleteChange}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist