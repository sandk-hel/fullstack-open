import axios from 'axios'
const baseUrl = '/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async anecdote => {
  const response = await axios.post(baseUrl, {
    content: anecdote,
    votes: 0,
    important: false
  })
  return response.data
}

const update = async (updatedAnecdote) => {
  const url = `${baseUrl}/${updatedAnecdote.id}`
  const response = await axios.put(url, updatedAnecdote)
  return response.data
}

export default {
  getAll,
  createNew,
  update
}
