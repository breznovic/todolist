import React, {useCallback} from 'react'
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {FilterType} from "./state/todolistsReducer";
import {TaskType} from "./api/todoAPI";

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

const Todolist = React.memo((props: PropsType) => {

    const changeAll = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const changeActive = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const changeCompleted = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    const removeTodo = useCallback(() => {
        props.removeTodo(props.id)
    }, [props.removeTodo, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoTitle = useCallback((newTitle: string) => {
        props.changeTodoTitle(props.id, newTitle)
    }, [props.changeTodoTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoTitle}/>
            <button onClick={removeTodo}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => <Task task={t}
                                           todolistId={props.id}
                                           onChangeTaskTitle={props.onChangeTaskTitle}
                                           removeTask={props.removeTask}
                                           key={t.id}
                                           changeStatus={props.changeStatus}
                />)
            }
        </ul>
        <div>
            <button onClick={changeAll} className={props.filter === 'all' ? 'activeFilter' : ''}>All</button>
            <button onClick={changeActive} className={props.filter === 'active' ? 'activeFilter' : ''}>Active</button>
            <button onClick={changeCompleted} className={props.filter === 'completed' ? 'activeFilter' : ''}>Completed
            </button>
        </div>
    </div>
})

export default Todolist