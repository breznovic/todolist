import React from 'react';
import './App.css';
import HookCounter from './Components/HookCounter';
import HookCounter1 from './Components/HookCounter1';
import HookCounterTwo from './Components/HookCounterTwo';

function App() {
  return (
    <div className='app'>
      <HookCounterTwo />
      <HookCounter1 />
    </div>
  );
}

export default App;
