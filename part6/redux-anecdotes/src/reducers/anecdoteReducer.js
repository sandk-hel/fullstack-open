const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE': 
      return action.data
    case 'VOTE':
      const id = action.data.id
      const votedItem = state.find(item => item.id === id)
      const updatedItem = { ...votedItem, votes: votedItem.votes + 1 }
      return state.map(item => item.id === id ? updatedItem : item)
    case 'ADD_NEW':
      const anecdote = action.data.anecdote
      const anecdoteObject = asObject(anecdote)
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
    data: { anecdote }
  }
}

export const initialize = (anecdotes) => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}

export default reducer
