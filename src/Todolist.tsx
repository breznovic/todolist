import React, {useCallback} from 'react'
import './App.css'
import {FilterType, TaskType} from "./App"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Button, IconButton} from "@mui/material"
import {Delete} from '@mui/icons-material'
import {Task} from "./Task";


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

export const Todolist = React.memo(function (props: PropsType) {

    const changeOnAll = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const changeOnCompleted = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])
    const changeOnActive = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])

    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={deleteTodolist} size="large">
                <Delete fontSize="inherit"/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    <Task todolistId={props.id}
                          removeTask={props.removeTask}
                          changeTaskTitle={props.changeTaskTitle}
                          changeStatus={props.changeStatus}
                          task={t}
                          key={t.id}
                    />
                })
            }
        </div>
        <div>
            <Button color={'primary'} variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={changeOnAll}>All</Button>
            <Button color={'warning'} variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={changeOnActive}>Active</Button>
            <Button color={'success'} variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={changeOnCompleted}>Completed</Button>
        </div>
    </div>
})




