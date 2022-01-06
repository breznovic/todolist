import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import {Todolist} from "./Todolist";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])

    let [choose, setChoose] = useState<FilterType>('all')

    let chooseTask = tasks

    if (choose === 'active') {
        chooseTask = tasks.filter(t => t.isDone === false)
    }

    if (choose === 'completed') {
        chooseTask = tasks.filter(t => t.isDone === true)
    }

    function demTask(id: string) {
        let filteredTask = tasks.filter(t => t.id !== id)
        setTasks(filteredTask)
    }

    function chooseTaskStatus(value: FilterType) {
        setChoose(value)
    }

    function anotherTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let anTask = [task, ...tasks]
        setTasks(anTask)
    }

    return <div className='app'>
        <Todolist title='What to learn'
                  tasks={chooseTask}
                  demTask={demTask}
                  chooseTaskStatus={chooseTaskStatus}
                  anotherTask={anotherTask}/>
    </div>
}

export default App