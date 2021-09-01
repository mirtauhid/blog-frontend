/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const login = async credentials => {
    const baseUrl = '/api/login'
    const response = await axios.post(baseUrl, credentials)
    return response.data
}


export default { login };