import React, {useState} from 'react'
import './App.css'
import {TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    newTask: (title: string) => void
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const newTask = (e: number) => {props.newTask(title)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} />
            <button onClick={newTask}>+</button>
        </div>
        <div>
            {
                props.tasks.map(t => {

                    const deleteTask = () => props.deleteTask(t.id)

                    return <div key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={deleteTask}>x</button>
                </div>})
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