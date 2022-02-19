import React from 'react'
import './App.css'
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoAC,
} from "./state/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'active' | 'completed' | 'all'

export type TodoType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodoType>>(state => state.todolists)

    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FilterType, todolistId: string) {
        dispatch(changeTodoFilterAC(todolistId, value))
    }

    function changeStatus(taskId: string, todolistId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(taskId, todolistId, isDone))
    }

    let removeTodo = (todolistId: string) => {
        dispatch(removeTodoAC(todolistId))
    }

    let changeTodoTitle = (id: string, newTitle: string) => {
        dispatch(changeTodoTitleAC(id, newTitle))
    }

    function addTodo(title: string) {
        dispatch(addTodoAC(title))
    }

    function onChangeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, todolistId, newTitle))
    }

    return <div className='app'>
        <AddItemForm addItem={addTodo}/>
        {
            todolists.map((td) => {

                let tasksForTodolist = tasks[td.id]
                if (td.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                if (td.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }

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
