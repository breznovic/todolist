import React from 'react'
import './App.css'
import { FaReact } from 'react-icons/fa'
import { BiAt, BiAtom } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import HookCounter from './Components/HookCounter'



function App() {
  return (
    <IconContext.Provider value={{ color: 'red', size: '6rem' }}>
      <div className='app'>
        <div>
        <FaReact />
        <BiAt color='green' />
        <BiAtom />
        <HookCounter />
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default App;
