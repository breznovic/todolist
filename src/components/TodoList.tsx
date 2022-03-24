import React, {useState} from 'react'
import '../App.css'
import TodoForm from "./TodoForm";

function TodoList() {

    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        if(!todo.text || /^|s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    return <div className=''>
        <h1>Plan for today</h1>
        <TodoForm onSubmit={addTodo}/>
    </div>
}

export default TodoList