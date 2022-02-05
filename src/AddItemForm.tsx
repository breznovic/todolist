import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Field is require')
        }
    }

    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onClickEnter}
               className={error ? 'error' : ''}
        />
        <button onClick={addTask}
        >+
        </button>
        {error && <div className='errorMessage'>{error}</div>}
    </div>
}