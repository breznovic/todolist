import React, {useCallback, useEffect} from 'react'
import './App.css'
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC, fetchTodolistsTC, fetchTodolistsThunk, FilterType,
    removeTodoAC, setTodoAC, TodolistDomainType,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType, todoAPI} from "./api/todoAPI";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterType, todolistId: string) => {
        dispatch(changeTodoFilterAC(todolistId, value))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, todolistId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, todolistId, isDone))
    }, [dispatch])

    let removeTodo = useCallback((todolistId: string) => {
        dispatch(removeTodoAC(todolistId))
    }, [dispatch])

    let changeTodoTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoTitleAC(id, newTitle))
    }, [dispatch])

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoAC(title))
    }, [dispatch])

    const onChangeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, todolistId, newTitle))
    }, [dispatch])

    return <div className='app'>
        <AddItemForm addItem={addTodo}/>
        {
            todolists.map((td) => {

                let tasksForTodolist = tasks[td.id]

                return <Todolist title={td.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={td.filter}
                                 key={td.id}
                                 id={td.id}
                                 removeTodo={removeTodo}
                                 onChangeTaskTitle={onChangeTaskTitle}
                                 changeTodoTitle={changeTodoTitle}
                />
            })
        }
    </div>
}