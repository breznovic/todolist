import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type BestInputType = {
    addItem: (title: string) => void
}

function TheBestInput(props: BestInputType) {

    let [trash, setTrash] = useState<string | null>(null)
    let [forTask, setForTask] = useState('')

    const freshTask = () => {
        if (forTask.trim() !== '') {
            props.addItem(forTask.trim())
            setForTask('')
        } else {
            setTrash('You made mistake')
        }
    }

    const freshInputTask = (e: ChangeEvent<HTMLInputElement>) => {
        setForTask(e.currentTarget.value)
    }
    const freshButtonTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setTrash(null)
        if (e.charCode === 13) {
            freshTask()
        }
    }

    return <div>
        <input value={forTask}
               onChange={freshInputTask}
               onKeyPress={freshButtonTask}
               className={trash ? 'error' : ''}/>
        <button onClick={freshTask}>+</button>
        {trash && <div className={'errorMessage'}>{trash}</div>}
    </div>
}

export default TheBestInput