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

    const changeAll = () => props.changeFilter('all')
    const changeActive = () => props.changeFilter('active')
    const changeCompleted = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
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