import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addNewTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setNewTitle('')
        } else {
            setError('Your are wrong, stupid!')
        }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    return <div>
        <input value={title}
               onChange={changeHandler}
               onKeyPress={enterHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className='errorMessage'>{error}</div>}
    </div>
})