import React, {FormEvent, useState} from 'react'
import '../App.css'

type PropsType = {
    onSubmit: () => void
}

function TodoForm(props: PropsType) {

    const [input, setInput] = useState('')

    const handleChange = (e: number) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })
        setInput('')
    }

    return <div>
        <form className='todo-form' onSubmit={handleSubmit}>
            <input type='text'
                   placeholder='Add a todo'
                   value={input} name='text'
                   className='todo-input'
                   onChange={handleChange}
            />
            <button className='todo-button'>Add todo</button>
        </form>
    </div>
}

export default TodoForm