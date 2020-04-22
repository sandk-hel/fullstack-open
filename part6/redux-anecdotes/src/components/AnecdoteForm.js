import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObject = await anecdoteService.createNew(anecdote)
    dispatch(createNew(anecdoteObject))
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