import React, {useState} from 'react';
import './App.css'
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    let taskForTodolist = tasks
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className='app'>
            <TodoList title='What to learn'
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;