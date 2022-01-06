import React, {ChangeEvent, useState, KeyboardEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    demTask: (id: string) => void
    chooseTaskStatus: (value: FilterType) => void
    anotherTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [forTask, setForTask] = useState('')

    const chooseActive = () => props.chooseTaskStatus('active')
    const chooseAll = () => props.chooseTaskStatus('all')
    const chooseComplete = () => props.chooseTaskStatus('completed')
    const freshTask = () => {props.anotherTask(forTask)
    setForTask('')
    }
    const freshInputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setForTask(e.currentTarget.value)
    }
    const freshButtonTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            freshTask()
        }
    }

        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={forTask}
                           onChange={freshInputTask}
                    onKeyPress={freshButtonTask}/>
                    <button onClick={freshTask}>+</button>
                </div>
                {
                    props.tasks.map(t => {
                        const demolTask = () => props.demTask(t.id)
                        return <div key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={demolTask}>x</button>
                        </div>
                    })
                }
                <button onClick={chooseAll}>All</button>
                <button onClick={chooseActive}>Active</button>
                <button onClick={chooseComplete}>Completed</button>
            </div>
        )
    }