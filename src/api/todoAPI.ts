import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7ab1beef-116d-4d2e-be2c-80cf2d156de8'
    }
}

export const todoAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }
}

