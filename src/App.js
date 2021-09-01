import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(response),)
      setUsername('')
      setPassword('')
      window.location.reload()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])


  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then(blogs =>
        setBlogs(blogs)
      )
    }

  }, [user])


  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }


  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes
    }
    try {
      blogService.createNew(user.token, newBlog)
        .then((res) => {
          setSuccess(`a new blog ${res.title} by ${res.author} added`)
          document.getElementById("createForm").reset();
          setTitle('')
          setAuthor('')
          setUrl('')
          setLikes('')
          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        })

    }
    catch (exception) {
      setErrorMessage('blog submission failed ! try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }





  if (user === null) {
    return (
      <div>
        {
          errorMessage ? <p style={{ color: 'red', background: 'lightgrey', border: '2px solid red', padding: '10px 20px' }} >{errorMessage}</p> : null
        }
        <h2>Log in to application</h2>
        <form onSubmit={(event) => handleLogin(event)}>
          username <input type="text" name="username" id="username" onChange={({ target }) => setUsername(target.value)} /><br />

          password <input type="password" name="password" id="password" onChange={({ target }) => setPassword(target.value)} /><br />

          <input type="submit" value="login" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        success ? <p style={{ color: 'green', background: 'lightgrey', border: '2px solid green', padding: '10px 20px' }}  >{success}</p> : null
      }
      <p>{user.name} logged in</p> <button onClick={(event) => handleLogOut(event)} >logout</button>
      <br />
      <h2>Create new</h2>
      <form id="createForm" onSubmit={(event) => handleCreate(event)}>
        title <input type="text" name="title" id="title" onChange={({ target }) => setTitle(target.value)} />
        <br />
        author <input type="text" name="author" id="author" onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url <input type="text" name="link" id="link" onChange={({ target }) => setUrl(target.value)} />
        <br />
        likes <input type="text" name="likes" id="likes" onChange={({ target }) => setLikes(target.value)} />
        <br />
        <input type="submit" value="create" />
      </form>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App