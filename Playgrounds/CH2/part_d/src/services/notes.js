import axios from 'axios'
const baseUrl = '/notes'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`/notes/${id}`, newObject).then(response => response.data)
}

export default { getAll, create, update }