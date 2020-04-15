import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newPerson => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
  const url = `${baseUrl}/${id}`
  return axios.put(url, newPerson)
    .then(response => response.data)
}

export default { getAll, create, update, remove }