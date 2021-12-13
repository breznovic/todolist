import React from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
}

function Todolist(props: PropsType) {

    const onAllChange = () => props.changeFilter('all')
    const onCompleteChange = () => props.changeFilter('complete')
    const onActiveChange = () => props.changeFilter('active')

    return (
        <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
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