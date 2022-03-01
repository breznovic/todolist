import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    onChangeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const statusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, props.todolistId, newIsDoneValue)
    }
    const onChangeTaskTitle = useCallback((newValue: string) => {
        props.onChangeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.onChangeTaskTitle, props.task.id, props.todolistId])
    return <li key={props.task.id} className={props.task.isDone ? 'isDone' : ''}><input type="checkbox"
                                                                                        checked={props.task.isDone}
                                                                                        onChange={statusHandler}
    />
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}/>
        <button onClick={onRemoveTask}>x</button>
    </li>
})