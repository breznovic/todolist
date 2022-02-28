import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox'
import './App.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Value is require')
        }
    }

    return <div className='container'>
        <TextField
            label='Type value'
            variant="outlined"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onClickEnter}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTask}>
            <AddBoxIcon color="primary" fontSize='inherit'/>
        </IconButton>
    </div>
})