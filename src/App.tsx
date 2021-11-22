import classes from './App.module.css';
import React, {useState} from 'react'
import './App.module.css'
import TodoList from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, isDone: true, title: 'React'},
        {id: 2, isDone: false, title: 'Angular'},
        {id: 3, isDone: false, title: 'Vue'}
    ])

    function removeTask(id: number) {
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
                          changeFilter={changeFilter}/>
            </div>
        </div>
    )
}

export default App