import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const upvote = (anecdote) => {
    props.addVote(anecdote)
    const message = `You upvoted \`${anecdote.content}\``
    props.setNotification(message, 10)
  }

  return props.anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => upvote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const filterText = state.filter
  const anecdotes = state.anecdotes
  const filteredAnecdotes = anecdotes.filter(a => a.content.includes(filterText))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return {
    anecdotes: sortedAnecdotes
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
