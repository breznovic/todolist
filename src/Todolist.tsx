import React, {ChangeEvent} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    onChangeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodo: (todolistId: string) => void
    changeTodoTitle: (id: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    const changeAll = () => props.changeFilter('all', props.id)
    const changeActive = () => props.changeFilter('active', props.id)
    const changeCompleted = () => props.changeFilter('completed', props.id)
    const removeTodo = () => {
        props.removeTodo(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoTitle = (newTitle: string) => {
        props.changeTodoTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoTitle}/>
            <button onClick={removeTodo}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const onRemoveTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, props.id, newIsDoneValue)
                    }
                    const onChangeTaskTitle = (newValue: string) => {
                        props.onChangeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}><input type="checkbox"
                                                                                      checked={t.isDone}
                                                                                      onChange={statusHandler}
                    />
                        <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                        <button onClick={onRemoveTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={changeAll} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
            <button onClick={changeActive} className={props.filter === 'active' ? 'activeFilter' : ''}>Active</button>
            <button onClick={changeCompleted} className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed
            </button>
        </div>
    </div>
}

export default Todolist

