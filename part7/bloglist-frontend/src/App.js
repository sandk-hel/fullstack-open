import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userDetailStorage from './services/userDetailStorage'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ text: null })

  const blogFormRef = React.createRef()

  const sortedBlogs = blogs.sort((b1, b2) => {
    if (b2.likes > b1.likes) {
      return 1
    }
    return b2.likes === b1.likes ?  b1.title.localeCompare(b2.title) : -1
  })

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
      showNotification('wrong username or password', false)
    }
  }

  const handleLogout = () => {
    userDetailStorage.removeUser()
    setUser(null)
  }

  const increaseLike = async (blog) => {
    try {
      const updatedBlog = { title: blog.title,
                            author: blog.author,
                            url: blog.url, 
                            id: blog.id,
                            user: blog.user.id,
                            likes: blog.likes  + 1 }
      const returnedObject = await blogService.update(updatedBlog)
      const index = blogs.findIndex(obj => obj.id === returnedObject.id)
      const clonedBlogs = [...blogs]
      clonedBlogs[index] = returnedObject
      setBlogs(clonedBlogs)
    } catch (exception) {
      console.log('Error occurred ', exception)
    }
  }

  const deleteBlog = async (blog) => {
    const message = `Remove blog \`${blog.title}\` by ${blog.author}`
    const confirmedDeletion = window.confirm(message)
    if (!confirmedDeletion) {
      return
    }

    try {
      await blogService.remove(blog.id)
      const notification = `Blog \`${blog.title}\` removed`
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showNotification(notification, true)
    } catch (exception) {
      console.log(exception)
    }
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, savedBlog])
      const message = `a new blog \`${savedBlog.title}\` by ${savedBlog.author} added`
      showNotification(message, true)
    } catch (exception) {
      console.log('Error occurred: ', exception)
    }
  }

  const showNotification = (message, isSuccess) => {
    console.log('Showing notification ', message, ' ', isSuccess)
    setNotification({ text: message, isSuccess })
    setTimeout(() => {
      setNotification({ text: null })
    }, 5000)
  }

  const canDelete = (blog) => {
    const isDeletable = user.username === blog.user.username
    return isDeletable
  }

  const blogList = () => {
    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} increaseLike={increaseLike} blog={blog} deleteBlog={ canDelete(blog) ? deleteBlog : null } />
        )}
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonTitle='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogList()}
      </div>
    )
  }
  const loginForm = () => {
    return (
      <div>
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
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h2>{user === null
        ? 'log in to application'
        : 'blogs'
      }
      </h2>
      <Notification notification={notification} />
      {user === null
        ? loginForm()
        : blogForm()
      }
    </div>
  )
}

export default App