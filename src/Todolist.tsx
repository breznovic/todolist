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
        <div>
            {
                props.tasks.map(t => <div key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                </div>)
            }
        </div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}

export default Todolist

