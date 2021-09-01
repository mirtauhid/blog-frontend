/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = '/api/blogs'

const getAll = (token) => {


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
  }
  const request = axios.get(baseUrl, { headers: headers })
  return request.then(response => response.data)
}


const createNew = (token, blogObj) => {


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
  }
  const request = axios.post(baseUrl, blogObj, { headers: headers })
  return request.then(response => response.data)
}

export default { getAll, createNew }