import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (updatedBlog) => {
  const url = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(url, updatedBlog)
  return response.data
}

const create = async (attributes) => {
  const configuration = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, attributes, configuration)
  return response.data
}

export default { 
  getAll,
  create,
  setToken,
  update
}
