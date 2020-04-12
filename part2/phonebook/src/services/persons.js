import axios from 'axios'

let getAll = () => {
    return axios
            .get('/persons')
            .then(response => response.data)
}

let create = newPerson => {
    return axios
            .post('/persons', newPerson)
            .then(response => response.data)
}

let remove = id => {
    return axios.delete(`/persons/${id}`)
}

let update = (id, newPerson) => {
    const url = `/persons/${id}`
    return axios.put(url, newPerson)
            .then(response => response.data)
}

export default { getAll, create, update, remove } 