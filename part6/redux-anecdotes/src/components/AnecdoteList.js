import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter))
                                                        .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const upvote = (anecdote) => {
    dispatch(addVote(anecdote))
    const message = `You upvoted \`${anecdote.content}\``
    dispatch(setNotification(message, 10))
  }

  return anecdotes.map(anecdote =>
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

export default AnecdoteList
