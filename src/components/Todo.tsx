import React, {useState} from 'react'
import '../App.css'

import {RiCloseCircleLine, TiEdit} from "react-icons/all";
import TodoForm from "./TodoForm";
import {TodoType} from "./TodoList";

type PropsType = {
    updateTodo: (todoId: string | null, newValue: TodoType) => void
    completeTodo: (id: string) => void
    removeTodo: (id: string) => void
    todos: Array<TodoType>
}

export type EditType<T> = {
    id: T
    value: string
}

const Todo: React.FC<PropsType> = (props) => {

    const [edit, setEdit] = useState<EditType<null | string>>({
        id: null,
        value: ''
    })

    const submitUpdate = (value: TodoType) => {
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

    return (
        <>
        {
            props.todos.map((todo, index) => (

                <div key={index} className={todo.isComplete ? 'todo-row complete' : 'todo-row'} >
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
        </>
    )
    }

    export default Todo