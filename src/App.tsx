import React, {useState} from 'react'
import './App.css'
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    const deleteTask = (id: string) => {
        let filterTasks = tasks.filter(t => t.id != id)
        setTasks(filterTasks)
    }

    return <div>
        <Todolist title='What to learn'
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  filter={filter}
                  changeFilter={changeFilter}
                  addTask={addTask}
        />
    </div>
}

export default App