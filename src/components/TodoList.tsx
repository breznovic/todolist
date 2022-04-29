import React, {useState} from 'react'
import '../App.css'
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export type TodoType = {
    id: string
    isComplete?: boolean
    text: string
}

function TodoList() {

    const [todos, setTodos] = useState<Array<TodoType>>([])

    const addTodo = (todo: TodoType) => {

        if (!todo.text) return

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const updateTodo = (todoId: string | null, newValue: TodoType) => {
        if (!newValue.text) {
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = (id: string) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
    }

    const completeTodo = (id: string) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return <div>
        <h1>Plan for today</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo todos={todos}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
        />
    </div>
}

export default TodoList