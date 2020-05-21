import React from 'react'
import './App.css'
import NewNote from './components/new_note'
import Notes from './components/notes'
import  VisibilityFilter from './components/visibility_filter'

let App = () => {
  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
