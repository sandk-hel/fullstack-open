import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Users from './components/Users'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Button, TextField, Container, Typography } from '@material-ui/core'


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
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonTitle='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogList blogs={sortedBlogs} />
      </div>
    )
  }
  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <TextField required 
              label="username" 
              name='username' 
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          <TextField required
              type='password'
              label="password" 
              name='password' 
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button type="submit">login</Button>
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
    <Container>
      {user === null
        ? <Typography variant='caption'>Log in to the application</Typography>
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
    </Container>
  )
}

export default App
