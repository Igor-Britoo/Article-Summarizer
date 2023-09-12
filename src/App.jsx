//import React from 'react'
import Hero from './components/Hero'

import './App.css'

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>

      <div className='app'>
        <Hero />
      </div>
    </main>
  )
}

export default App