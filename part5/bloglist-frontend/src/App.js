import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const blogList = () => {
    return  (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
    {user === null 
    ? loginForm()
    : blogList()
    }
    </div>
  )
}

export default App