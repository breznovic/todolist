import React from 'react'
import './App.css'
import {AddItemForm} from "./AddItemForm";
import Todolist from "./Todolist";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolist,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function changeFilter(value: FilterType, todolistId: string) {
        dispatch(changeTodolistFilter(todolistId, value))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    let deleteTodolist = (todolistId: string) => {
        const action = removeTodolist(todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((td) => {
                            let tasksForTodolist = tasks[td.id]
                            if (td.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
                            if (td.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        key={td.id}
                                        id={td.id}
                                        title={td.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={td.filter}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App