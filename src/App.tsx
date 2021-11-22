import classes from './App.module.css';
import React, {useState} from 'react'
import './App.module.css'
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), isDone: true, title: 'React'},
        {id: v1(), isDone: false, title: 'Angular'},
        {id: v1(), isDone: false, title: 'Vue'}
    ])

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className={classes.app}>
            <div className='app'>
                <TodoList title={'What to learn'}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}/>
            </div>
        </div>
    )
}

export default App