import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE': 
      return action.data
    case 'VOTE':
      const id = action.data.id
      const votedItem = state.find(item => item.id === id)
      const updatedItem = { ...votedItem, votes: votedItem.votes + 1 }
      return state.map(item => item.id === id ? updatedItem : item)
    case 'ADD_NEW':
      const anecdoteObject = action.data
      return [anecdoteObject, ...state]
  }
  return state
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createNew = (anecdote) => {
  return {
    type: 'ADD_NEW',
    data: anecdote
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
