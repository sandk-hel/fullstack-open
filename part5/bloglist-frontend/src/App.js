import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userDetailStorage from './services/userDetailStorage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      userDetailStorage.storeUser(user)
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error("Error occurred when logging in user: ", exception)
    }
  }

  const handleLogout = () => {
    userDetailStorage.removeUser()
    setUser(null)
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create({ title, author, url })
      setBlogs([...blogs, savedBlog])
    } catch (exception) {
      console.log('Error occurred: ', exception)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const blogList = () => {
    return  (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={submitBlog}>
          <div>
            <label>title</label>
            <input 
              name='title' 
              value={title}
              onChange={({ target }) => setTitle(target.value)} 
              />
          </div>

          <div>
            <label>author</label>
            <input 
              name='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)} />
          </div>

          <div>
            <label>url</label>
            <input 
              name='url'
              value={url} 
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>

          <div>
            <button type='submit'>create</button>
          </div>

        </form>
      </div>
    )
  }
  const loginForm = () =>  {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input type='text'
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label>password</label>
            <input type='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  useEffect(() => {
    const loggedInUser = userDetailStorage.getUser()
    if (loggedInUser) {
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
  }, [])
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
    {user === null 
    ? loginForm()
    : (<div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogForm()}
        {blogList()}
      </div>)
    }
    </div>
  )
}

export default App