import React from 'react'
import './App.css'
import NewNote from './components/new_note'
import Notes from './components/notes'

let App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
