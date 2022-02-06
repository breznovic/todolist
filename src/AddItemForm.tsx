import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {Box, FormControl, TextField} from "@mui/material";

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
        <Box sx={{
            width: 500,
            maxWidth: '100%',
        }}>
            <FormControl sx={{ width: '30ch' }}>
                <TextField fullWidth label="New task" id="fullWidth"
                               value={title}
                               onChange={onChangeHandler}
                               onKeyPress={onClickEnter}
                               className={error ? 'error' : ''}
                />
            </FormControl>
            <button onClick={addTask}>
                <AddTwoToneIcon sx={{ fontSize: 50 }}/>
            </button>
        </Box>
        {error && <div className='errorMessage'>{error}</div>}
    </div>
}

