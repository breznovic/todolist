import { react } from '@babel/types'
import React from 'react'
import Person from './Person'

function NameList() {
    const names = ['Bruce', 'Clark', 'Diana', 'Bruce']
    const persons = [{
        id: 1,
        name: 'Bruce',
        age: 25,
        skill: 'React'
    },
    {
        id: 2,
        name: 'John',
        age: 35,
        skill: 'Angular'
    },
    {
        id: 3,
        name: 'Diana',
        age: 15,
        skill: 'Vue'
    }]
    const nameList = names.map((name, index) => <h2 key={index}>{index} {name}</h2>)
    return <div>{nameList}</div>
}

export default NameList
