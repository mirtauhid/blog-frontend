import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
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
  const [createVisible, setCreateVisible] = useState(false)

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
    async function getAllBlogs(user) {
      if (user?.token) {
        const allBlogs = await blogService.getAll(user.token);
        const sortedBlogs = allBlogs.sort((a, b) => b.likes < a.likes ? - 1 : Number(b.likes > a.likes))
        setBlogs(sortedBlogs)
      }
    }

    getAllBlogs(user)

  }, [user])


  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }


  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes
    }
    try {
      const res = await blogService.createNew(user.token, newBlog)
      setSuccess(`a new blog ${res.title} by ${res.author} added`)
      document.getElementById("createForm").reset();
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
      setTimeout(() => {
        setSuccess(null)
      }, 5000)

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
      <div style={{ display: createVisible ? 'block' : 'none' }} >
        <CreateForm
          handleCreate={handleCreate}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          setLikes={setLikes}
        >
        </CreateForm>
      </div>
      <div style={{ display: createVisible ? 'none' : 'block' }} >
        <button onClick={() => setCreateVisible(true)} >create new blog</button>
      </div>
      <div style={{ display: createVisible ? 'block' : 'none' }} >
        <button onClick={() => setCreateVisible(false)} >cancel</button>
      </div>

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} />
      )}
    </div>
  )
}


export default App