import React, {ChangeEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, todoId: string) => void
    changeF: (value: FilterType, todoId: string) => void
    changeStat: (id: string, isDone: boolean, todoId: string) => void
    filter: FilterType
    id: string
    deleteTodo: (todoId: string) => void
    newTask: (title: string, todoId: string) => void
}


function Todolist(props: PropsType) {

    const allIn = () => props.changeF('all', props.id)
    const compIn = () => props.changeF('completed', props.id)
    const actIn = () => props.changeF('active', props.id)

    const deleteTodo = () => {
        props.deleteTodo(props.id)
    }

    const newTask = (title: string) => {
        props.newTask(title, props.id)
    }

    return <div>
        <h3>{props.title}
            <button onClick={deleteTodo}>x</button>
        </h3>
        <div>
            {
                props.tasks.map(t => {

                    const deleteTask = () => props.deleteTask(t.id, props.id)
                    const changeStat = (e: ChangeEvent<HTMLInputElement>) => props.changeStat(t.id, e.currentTarget.checked, props.id)

                    return <div key={t.id} className={t.isDone ? 'isDone' : ''}><input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeStat}/>
                        <button onClick={deleteTask}>x</button>
                    </div>
                })
            }
        </div>
        <div>
            <button onClick={allIn} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
            <button onClick={actIn} className={props.filter === 'active' ? 'activeFilter' : ''}>Active</button>
            <button onClick={compIn} className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed</button>
        </div>
    </div>
}

export default Todolist

