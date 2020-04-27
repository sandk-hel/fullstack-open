import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Users from './components/Users'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'

import { showNotification } from './reducers/notifications'
import {
  update,
  createNew,
  initialize,
  addComment
} from './reducers/blogs'

import { logIn, loadUser, logOut } from './reducers/loggedInUser'
import Navigation from './components/Navigation'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.loggedInUser)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const sortedBlogs = blogs.sort((b1, b2) => {
    if (b2.likes > b1.likes) {
      return 1
    }
    return b2.likes === b1.likes ? b1.title.localeCompare(b2.title) : -1
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    dispatch(update(updatedBlog))
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNew(newBlog))
    const message = `a new blog \`${newBlog.title}\` by ${newBlog.author} added`
    displayNotification(message, true)
  }

  const displayNotification = (message, isSuccess) => {
    dispatch(showNotification(message, isSuccess))
  }

  const blogList = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    return (
      <div>
        {sortedBlogs.map(blog =>
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              {blog.title}
            </Link>
          </div>
        )}
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
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
    dispatch(loadUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  const match = useRouteMatch('/blogs/:id')

  const updateComment = (blogId, comment) => {
    dispatch(addComment(blogId, comment))
  }

  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

    return (
    <div>
      {user === null
        ? <h2>log in to application</h2>
        : <Navigation user={user} handleLogout={handleLogout} />
      }
      <Notification notification={notification} />
      <Switch>
        <Route path='/users'>
        { user === null ? loginForm() : <Users /> }
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={blog} likeBlog={likeBlog}  addComment={(comment) => updateComment(blog.id, comment)} />
        </Route>
        <Route path='/'>
          { user === null ? loginForm() : blogForm() }
        </Route>
      </Switch>
    </div>
  )
}

export default App
