import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE': 
      return action.data
    case 'UPDATE':
      const updatedAnecdote = action.data
      return state.map(item => item.id === updatedAnecdote.id ? updatedAnecdote : item)
    case 'ADD_NEW':
      const anecdoteObject = action.data
      return [anecdoteObject, ...state]
   default:
      return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const returnedAnecdote = await anecdotesService.update(updatedAnecdote)
    dispatch({
      type: 'UPDATE',
      data: returnedAnecdote
    })
  }
}

export const createNew = (anecdote) => {
  return async dispatch => {
    const savedAnecdote = await anecdotesService.createNew(anecdote)
    dispatch({
      type: 'ADD_NEW',
      data: savedAnecdote
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default reducer
