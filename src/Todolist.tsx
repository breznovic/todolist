import React, {ChangeEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    id: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    const changeOnAll = () => {
        props.changeFilter('all', props.id)
    }

    const changeOnCompleted = () => {
        props.changeFilter('completed', props.id)
    }

    const changeOnActive = () => {
        props.changeFilter('active', props.id)
    }

    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
        return (
            <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={deleteTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.id)
                        const changeCheck = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        }
                        const changeTitle = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeCheck}/>
                            <EditableSpan title={t.title} onChange={changeTitle}/>
                            <button onClick={removeTask}>x</button>
                        </div>
                    })
                }
                <button onClick={changeOnAll} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
                <button onClick={changeOnActive} className={props.filter === 'active' ? 'activeFilter' : ''}>Active
                </button>
                <button onClick={changeOnCompleted}
                        className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed
                </button>
        </div>
        )
    }

export default Todolist