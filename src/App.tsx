import React, {useState} from 'react'
import './App.css'
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    let taskTodo = tasks

    if (filter === 'active') {
        taskTodo = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        taskTodo = tasks.filter(t => t.isDone)
    }

    function newTask (title: string) {
        let nTask = {id: v1(), title: title, isDone:false}
        let nwTask = [nTask, ...tasks]
        setTasks(nwTask)

    }

    function deleteTask (id: string) {
        let tasksForTodo = tasks.filter(t => t.id !== id)
        setTasks(tasksForTodo)
    }

    return <div>
        <Todolist title='What to learn'
                  tasks={taskTodo}
                  deleteTask={deleteTask}
                  newtask={newTask}
        />
    </div>
}

export default App