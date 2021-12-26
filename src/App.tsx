import React, {useState} from 'react'
import './App.css'
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    function newTask(title: string, todoId: string) {
        let nTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoId]
        let nwTask = [nTask, ...tasks]
        tasksObj[todoId] = nwTask
        setTasksObj({...tasksObj})

    }

    function deleteTask(id: string, todoId: string) {
        let tasks = tasksObj[todoId]
        let tasksForTodo = tasks.filter(t => t.id !== id)
        tasksObj[todoId] = tasksForTodo
        setTasksObj({...tasksObj})
    }

    function changeF(value: FilterType, todoId: string) {
        let todolist = todolists.find(todo => todo.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStat(id: string, isDone: boolean, todoId: string) {
        let tasks = tasksObj[todoId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let deleteTodo = (todoId: string) => {
        let filteredTodo = todolists.filter(todo => todo.id !== todoId)
        setTodolists(filteredTodo)
        delete tasksObj[todoId]
        setTasksObj({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}],
        [todolistId2]: [
            {id: v1(), title: 'Hula', isDone: true},
            {id: v1(), title: 'Cola', isDone: true},
            {id: v1(), title: 'Rust', isDone: false}]
    })

    return <div className='app'>
        {
            todolists.map((todo) => {

                let taskTodo = tasksObj[todo.id]

                if (todo.filter === 'active') {
                    taskTodo = taskTodo.filter(t => !t.isDone)
                }
                if (todo.filter === "completed") {
                    taskTodo = taskTodo.filter(t => t.isDone)
                }

                return <Todolist
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    tasks={taskTodo}
                    deleteTask={deleteTask}
                    newTask={newTask}
                    changeF={changeF}
                    changeStat={changeStat}
                    filter={todo.filter}
                    deleteTodo={deleteTodo}
                />
            })
        }
    </div>
}

export default App