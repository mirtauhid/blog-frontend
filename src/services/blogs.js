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

const addLike = (blogObj, token) => {
  const newObj = {
    id: blogObj.id,
    title: blogObj.title,
    author: blogObj.author,
    url: blogObj.url,
    likes: blogObj.likes,
    user: blogObj.user,
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
  }

  const updateUrl = `/api/blogs/${blogObj.id}`

  console.log(newObj)

  axios.put(updateUrl, newObj, { headers: headers }).then(response => {
    return response
  })


}

const deleteBlog = async (id, token) => {
  const delUrl = `/api/blogs/${id}`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`
  }
  const response = await axios.delete(delUrl, { headers })
  return response
}



export default { getAll, createNew, addLike, deleteBlog }