import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNew(anecdote)
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addNew}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  </>
}

const mapDispatchToProps = {
  createNew
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
