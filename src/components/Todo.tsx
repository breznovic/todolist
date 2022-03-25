import React, {useState} from 'react'
import '../App.css'
import {v1} from "uuid";
import {RiCloseCircleLine, TiEdit} from "react-icons/all";
import TodoForm from "./TodoForm";

type PropsType = {
    todos: string
    completeTodo: (id: string) => void
    removeTodo: (id: string) => void
    updateTodo: (id: string, newValue: string) => void
}

function Todo(props: PropsType) {

    const [edit, setEdit] = useState({
        id: v1(),
        value: ''
    })

    const submitUpdate = (value: string) => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit}
                         onSubmit={submitUpdate}
                         />
    }

    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => removeTodo(todo.id)}
                                   className='delete-icon'
                />
                <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})}
                        className='edit-icon'/>
            </div>
        </div>
    ))
    }

    export default Todo