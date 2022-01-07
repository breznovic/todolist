import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import TheBestInput from "./TheBestInput";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TDType = {
    id: string
    title: string
    choose: FilterType
}

type MainTaskType = {
    [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'completed' | 'active'

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasksObj, setTasks] = useState<MainTaskType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Story book', isDone: false},
            {id: v1(), title: 'Comix', isDone: false}
        ]
    })


    function demTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasks({...tasksObj})
    }

    function chooseTaskStatus(value: FilterType, todolistId: string) {
        let todolist = todolists.find(td => td.id === todolistId)
        if (todolist) {
            todolist.choose = value
            setTodolists([...todolists])
        }
    }

    function anotherTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let anTask = [task, ...tasks]
        tasksObj[todolistId] = anTask
        setTasks({...tasksObj})
    }

    function customStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function customTask(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeWords(id: string, newTitle: string) {
        const todolist = todolists.find(td => td.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [todolists, setTodolists] = useState<Array<TDType>>([
        {id: todolistId1, title: 'What to learn', choose: 'all'},
        {id: todolistId2, title: 'What to buy', choose: 'all'}
    ])

    let demTD = (todolistId: string) => {
        let filteredTodolists = todolists.filter(td => td.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    function addTodo(title: string) {
        let todolist: TDType = {
            id: v1(),
            choose: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return <div className='app'>
        <TheBestInput addItem={addTodo}/>
        {todolists.map((td) => {
            let chooseTask = tasksObj[td.id]

            if (td.choose === 'active') {
                chooseTask = chooseTask.filter(t => !t.isDone)
            }

            if (td.choose === 'completed') {
                chooseTask = chooseTask.filter(t => t.isDone)
            }
            return <Todolist title={td.title}
                             tasks={chooseTask}
                             demTask={demTask}
                             chooseTaskStatus={chooseTaskStatus}
                             anotherTask={anotherTask}
                             customStatus={customStatus}
                             choose={td.choose}
                             id={td.id}
                             key={td.id}
                             demTD={demTD}
                             customTask={customTask}
                             changeWords={changeWords}
            />
        })}
    </div>
}

export default App