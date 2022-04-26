import React, {useState} from 'react'
import '../App.css'
import {v1} from "uuid";
import {RiCloseCircleLine, TiEdit} from "react-icons/all";
import TodoForm from "./TodoForm";

function Todo(props) {

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = (value) => {
        props.updateTodo(edit.id, value)
        setEdit({
            id: '',
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit}
                         onSubmit={submitUpdate}
                         />
    }

    return props.todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => props.completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => props.removeTodo(todo.id)}
                                   className='delete-icon'
                />
                <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})}
                        className='edit-icon'/>
            </div>
        </div>
    ))
    }

    export default Todo