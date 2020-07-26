import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'



export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
    }
}