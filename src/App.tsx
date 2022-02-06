import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Todolist from "./Todolist";
import {Container, Grid, Paper} from "@mui/material";

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

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterType, todolistId: string) {
        let todolist = todolists.find(td => td.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(td => td.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]:
            [{id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false}],
        [todolistId2]:
            [{id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Eggs', isDone: false},
                {id: v1(), title: 'Carrots', isDone: false}]
    })
    console.log('taskObj', tasksObj)

    let deleteTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(td => td.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
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
                            let tasksForTodolist = tasksObj[td.id]
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