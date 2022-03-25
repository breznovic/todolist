import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react'
import '../App.css'
import {v1} from "uuid";

type PropsType = {
    onSubmit: (id: string) => void
    edit: (value: string) => void
}

function TodoForm(props: PropsType) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onSubmit({
            id: v1(),
            text: input
        })
        setInput('')
    }

    return <div>
        <form className='todo-form' onSubmit={handleSubmit}>
            {props.edit ? (
                <><input type='text'
                                  placeholder='Update your item'
                                  value={input} name='text'
                                  className='todo-input edit'
                                  onChange={handleChange}
                                  autoFocus
                />
                <button className='todo-button edit'>Update</button></>) :
                (<><input type='text'
                placeholder='Add a todo'
                value={input} name='text'
                className='todo-input'
                onChange={handleChange}
                autoFocus
                />
                <button className='todo-button'>Add todo</button></>)
            }
        </form>
    </div>
}

export default TodoForm