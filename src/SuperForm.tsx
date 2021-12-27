import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type ItemType = {
    addForm: (title: string) => void
}

export function SuperForm(props: ItemType) {

    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const newTask = (e: ChangeEvent<HTMLInputElement>) => {
        (setNewTitle(e.currentTarget.value))
    }

    const anyEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            buttonBang()
        }
    }

    const buttonBang = () => {
        if (newTitle.trim() !== '') {
            props.addForm(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Write your text')
        }
    }

    return <div>
        <input value={newTitle}
               onChange={newTask}
               onKeyPress={anyEnterKey}
               className={error ? 'error' : ''}/>
        <button onClick={buttonBang}>+</button>
        {error && <div className='errorMessage'>{error}</div>}
    </div>
}