import React, {ChangeEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";
import TheBestInput from "./TheBestInput";
import {BestSpan} from "./BestSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    demTask: (id: string, todolistId: string) => void
    chooseTaskStatus: (value: FilterType, todolistId: string) => void
    customStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    customTask: (taskId: string, newTitle: string, todolistId: string) => void
    choose: FilterType
    id: string
    demTD: (todolistID: string) => void
    anotherTask: (title: string, todolistId: string) => void
    changeWords: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const chooseActive = () => props.chooseTaskStatus('active', props.id)
    const chooseAll = () => props.chooseTaskStatus('all', props.id)
    const chooseComplete = () => props.chooseTaskStatus('completed', props.id)
    const demTD = () => {
        props.demTD(props.id)
    }
    const anTask = (title: string) => {
        props.anotherTask(title, props.id)
    }
    const changeWords = (newTitle: string) => {
        props.changeWords(props.id, newTitle)
    }

    return (
        <div>
            <h3><BestSpan title={props.title} onChange={changeWords}/>
                <button onClick={demTD}>x</button>
            </h3>
            <TheBestInput addItem={anTask}/>
            {
                props.tasks.map(t => {
                    const demolTask = () => props.demTask(t.id, props.id)
                    const thisStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.customStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const thisNewtask = (newValue: string) => {
                        props.customTask(t.id, newValue, props.id)
                    }
                    return <div key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={thisStatus}
                        />
                        <BestSpan title={t.title} onChange={thisNewtask}/>
                        <button onClick={demolTask}>x</button>
                    </div>
                })
            }
            <button className={props.choose === 'all' ? 'activeFilter' : ''} onClick={chooseAll}>All</button>
            <button className={props.choose === 'active' ? 'activeFilter' : ''} onClick={chooseActive}>Active</button>
            <button className={props.choose === 'completed' ? 'activeFilter' : ''} onClick={chooseComplete}>Completed
            </button>
        </div>
    )
}

