import React from 'react'
import './App.css'

type PropsType = {
    title: string
    id: string
}

function Todolist(props: PropsType) {

    return <div>
        <h3>{props.title}
            <button>x</button>
        </h3>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}

export default Todolist

