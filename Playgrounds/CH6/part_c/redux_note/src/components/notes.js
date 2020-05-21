import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return <ul>
    {notes.map(item =>
      <li
        key={item.id}
        onClick={() => toggleImportance(item.id)}
      >
        {item.content} <strong>{item.important ? 'Important' : ''}</strong>
      </li>
    )}
  </ul>
}

export default Notes