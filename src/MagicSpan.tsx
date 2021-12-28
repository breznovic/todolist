import React, {ChangeEvent, useState} from "react";

type MagicSpanType = {
    title: string
}

export function MagicSpan(props: MagicSpanType) {

    let [editMode, setEditMode] = useState(false)
    let [setTitle, setSetTitle] = useState('')

    const startEdit = () => {
        setSetTitle(props.title)
    }
    const startView = () => setEditMode(false)
    const titleChanger = (e: ChangeEvent<HTMLInputElement>) => setSetTitle(e.currentTarget.value)

    return editMode
        ? <input value={props.title} onBlur={startView} onChange={titleChanger} autoFocus />
        : <span onDoubleClick={startEdit}>{props.title}</span>
}