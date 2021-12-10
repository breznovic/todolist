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
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    id: string
    removeTodolist: (todolistId: string) => void
}

function TodoList(props: PropsType) {

    const onAllChangeFilter = () => props.changeFilter('all', props.id)
    const onActiveChangeFilter = () => props.changeFilter('active', props.id)
    const onCompletedChangeFilter = () => props.changeFilter('completed', props.id)

const removeTodolist = () => {
    props.removeTodolist(props.id)
}

const addTask = (title: string) => {
  props.addTask(title, props.id)
}

return <div>
    <h3>{props.title}
        <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
        {
            props.tasks.map(t => {
                const onRemoveTask = () => props.removeTask(t.id, props.id)
                const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                const onChangeTitleHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id)

                return <li key={t.id} className={t.isDone ? 'isDone' : ''}><input type="checkbox"
                                                                                  onChange={onCheckHandler}
                                                                                  checked={t.isDone}/>
                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <button onClick={onRemoveTask}>x
                    </button>
                </li>
            })
        }
    </ul>
    <div>
        <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllChangeFilter}>All</button>
        <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveChangeFilter}>Active
        </button>
        <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                onClick={onCompletedChangeFilter}>Completed
        </button>
    </div>
</div>
}

export default TodoList