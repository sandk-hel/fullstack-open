
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
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const update = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    id: blog.id,
    data: blog
  }
}

export const remove = (id) => {
  return {
    type: 'DELETE_BLOG',
    id
  }
}

export const initialize = (blogs) => {
  return {
    type: 'INITIALIZE',
    data: blogs
  }
}

export default blogsReducer