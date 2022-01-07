import React, {ChangeEvent, useState} from "react";

type SpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function BestSpan(props: SpanType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    let activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    let activateAnotherMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const newTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
    ? <input value={title} onChange={newTitle} onBlur={activateAnotherMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}