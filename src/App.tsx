import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";

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

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Pizza', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    })

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

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    let removeTodo = (todolistId: string) => {
        let filteredTodo = todolists.filter(td => td.id !== todolistId)
        setTodolists(filteredTodo)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let changeTodoTitle = (id: string, newTitle: string) => {
       const todolist = todolists.find(td => td.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    function addTodo(title: string) {
        let todolist: TodoType = {
            id: v1(), filter: 'all', title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    function onChangeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    return <div className='app'>
        <AddItemForm addItem={addTodo}/>
        {
            todolists.map((td) => {

                let tasksForTodolist = tasksObj[td.id]
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
