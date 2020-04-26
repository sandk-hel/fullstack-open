import blogService from '../services/blogs'

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
    } catch (exception) {
      // Set notification ?
      console.error('Error occurred: ', exception)
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
