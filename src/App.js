import React from 'react'
import './App.css'
import { FaReact } from 'react-icons/fa'
import { BiAt, BiAtom } from 'react-icons/bi'
import { IconContext } from 'react-icons'


function App() {
  return (
    <IconContext.Provider value={{ color: 'red', size: '6rem' }}>
      <div className='app'>
        <FaReact />
        <BiAt color='green' />
        <BiAtom />
      </div>
    </IconContext.Provider>
  )
}

export default App;
