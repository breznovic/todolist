import React from 'react'
import './App.css'
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const tasksOne: Array<TaskType> = [
        {id: 1, isDone: true, title: 'React'},
        {id: 2, isDone: false, title: 'Angular'},
        {id: 3, isDone: false, title: 'Vue'}
    ]

    const taskTwo: Array<TaskType> = [
        {id: 4, isDone: false, title: 'Fish'},
        {id: 5, isDone: true, title: 'Meat'},
        {id: 6, isDone: false, title: 'Vegetables'}
    ]


    return (
        <div className='app'>
            <TodoList title={'What to learn'} tasks={tasksOne}/>
            <TodoList title={'What to buy'} tasks={taskTwo}/>
        </div>
    );
}

export default App;
