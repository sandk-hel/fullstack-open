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

export default { getAll, create } 