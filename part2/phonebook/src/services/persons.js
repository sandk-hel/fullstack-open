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

export default { getAll, create, remove } 