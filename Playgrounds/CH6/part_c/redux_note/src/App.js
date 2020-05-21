import React, { useEffect } from 'react'
import './App.css'
import NewNote from './components/new_note'
import Notes from './components/notes'
import noteService from './services/notes'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'
import  VisibilityFilter from './components/visibility_filter'

let App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeNotes())
  }, [dispatch])
  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
