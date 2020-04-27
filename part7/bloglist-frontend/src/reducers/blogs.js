import blogService from '../services/blogs'
import { showNotification } from './notifications'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const id = action.id
      const updatedBlog = action.data
      return state.map(blog => blog.id === id ? updatedBlog : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => action.id !== blog.id)
    case 'INITIALIZE':
      return action.data
    case 'ADD_COMMENT':
      const blogId = action.data.blog
      return state.map(blog => (
         blog.id === blogId 
          ? { ...blog, comments: [ ...blog.comments, action.data ] }
          : blog
      ))

    default:
      return state
  }
}

export const createNew = (blog) => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: savedBlog
      })
      const message = `a new blog \`${savedBlog.title}\` by ${savedBlog.author} added`
      dispatch(showNotification(message, true))
    } catch (exception) {
      // Set notification ?
      console.error('Error occurred: ', exception)
    }

  }
}

export const addComment = (blogId, comment) => {
  return async dispatch => {
    try {
      const savedComment = await blogService.addComment(blogId, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: savedComment
      })
    } catch (exception) {
      console.log('Error occurred: ', exception)
    }
  }
}

export const update = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        id: updatedBlog.id,
        data: updatedBlog
      })
    } catch (exception) {
      // Set notification ?
      console.error('Error occurred: ', exception)
    }
  }
}

export const remove = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
    } catch (exception) {
      // Set notification ?
      console.error('Error occurred: ', exception)
    }
  }
}

export const initialize = () => {
  return async dispatch => {
    try {

      const blogs = await blogService.getAll()
      dispatch({
        type: 'INITIALIZE',
        data: blogs
      })
    } catch (exception) {
      console.error('Error occurred: ', exception)
    }
  }
}

export default blogsReducer
