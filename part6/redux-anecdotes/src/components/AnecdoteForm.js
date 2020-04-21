import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNew = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNew(anecdote))
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addNew}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm