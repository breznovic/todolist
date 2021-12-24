import React from 'react'
import './App.css'
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

function Todolist(props: PropsType) {
    return   <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <div>
            {
                props.tasks.map(t => <div key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                </div>)
            }
        </div>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}

export default Todolist